import { createServer } from 'node:http'
import { existsSync, readFileSync } from 'node:fs'
import { createChatReply } from './lib/portfolioAssistant.js'

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
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  sendJson(response, 404, { error: 'Not found.' })
}).listen(PORT, () => {
  console.log(`Ask Yi Wei API server running on http://localhost:${PORT}`)
})

