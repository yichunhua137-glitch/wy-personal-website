import { createServer } from 'node:http'
import { existsSync, readFileSync } from 'node:fs'
import { createAdminToken, verifyAdminToken, verifyPassword } from './lib/adminAuth.js'
import { createChatReply } from './lib/portfolioAssistant.js'
import { getAdminStats, recordEvent, recordVisit } from './lib/supabaseAdmin.js'

const PORT = Number(process.env.PORT ?? 3001)

function loadLocalEnv() {
  if (!existsSync('.env')) return

  const lines = readFileSync('.env', 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex === -1) continue

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimmed.slice(separatorIndex + 1).trim()

    if (key && !process.env[key]) {
      process.env[key] = value.replace(/^["']|["']$/g, '')
    }
  }
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
      if (body.length > 20_000) {
        reject(new Error('Request body is too large.'))
        request.destroy()
      }
    })

    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        reject(new Error('Request body must be valid JSON.'))
      }
    })

    request.on('error', reject)
  })
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  })
  response.end(JSON.stringify(data))
}

async function handleChat(request, response) {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    sendJson(response, 500, { error: 'DeepSeek API key is not configured.' })
    return
  }

  const body = await readJsonBody(request)
  const message = String(body.message ?? '').trim()

  if (!message) {
    sendJson(response, 400, { error: 'Message is required.' })
    return
  }

  const reply = await createChatReply(message, apiKey)
  sendJson(response, 200, { reply })
}

async function handleAnalyticsVisit(request, response) {
  const body = await readJsonBody(request)
  const result = await recordVisit(body.visitorId)
  sendJson(response, 200, result)
}

async function handleAnalyticsEvent(request, response) {
  const body = await readJsonBody(request)
  await recordEvent(body)
  sendJson(response, 200, { ok: true })
}

async function handleAdminLogin(request, response) {
  const body = await readJsonBody(request)
  const isValid = await verifyPassword(body.password)

  if (!isValid) {
    sendJson(response, 401, { error: 'Invalid password.' })
    return
  }

  const token = await createAdminToken()
  sendJson(response, 200, { token })
}

async function handleAdminStats(request, response) {
  const authorization = request.headers.authorization ?? ''
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : ''
  const isAuthorized = await verifyAdminToken(token)

  if (!isAuthorized) {
    sendJson(response, 401, { error: 'Unauthorized.' })
    return
  }

  const stats = await getAdminStats()
  sendJson(response, 200, stats)
}

loadLocalEnv()

createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {})
    return
  }

  if (request.method === 'POST' && request.url === '/api/chat') {
    try {
      await handleChat(request, response)
    } catch (error) {
      sendJson(response, 500, {
        error: error instanceof Error ? error.message : 'Unexpected server error.',
      })
    }
    return
  }

  if (request.method === 'POST' && request.url === '/api/analytics/visit') {
    try {
      await handleAnalyticsVisit(request, response)
    } catch (error) {
      sendJson(response, 500, {
        error: error instanceof Error ? error.message : 'Failed to record visit.',
      })
    }
    return
  }

  if (request.method === 'POST' && request.url === '/api/analytics/event') {
    try {
      await handleAnalyticsEvent(request, response)
    } catch (error) {
      sendJson(response, 500, {
        error: error instanceof Error ? error.message : 'Failed to record event.',
      })
    }
    return
  }

  if (request.method === 'POST' && request.url === '/api/admin/login') {
    try {
      await handleAdminLogin(request, response)
    } catch (error) {
      sendJson(response, 500, {
        error: error instanceof Error ? error.message : 'Login failed.',
      })
    }
    return
  }

  if (request.method === 'GET' && request.url === '/api/admin/stats') {
    try {
      await handleAdminStats(request, response)
    } catch (error) {
      sendJson(response, 500, {
        error: error instanceof Error ? error.message : 'Failed to load admin stats.',
      })
    }
    return
  }

  sendJson(response, 404, { error: 'Not found.' })
}).listen(PORT, () => {
  console.log(`Ask Yi Wei API server running on http://localhost:${PORT}`)
})
