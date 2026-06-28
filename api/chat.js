import { createChatReply } from '../lib/portfolioAssistant.js'

function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload)
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    sendJson(response, 405, { error: 'Method not allowed.' })
    return
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    sendJson(response, 500, { error: 'DeepSeek API key is not configured.' })
    return
  }

  const message = String(request.body?.message ?? '').trim()
  if (!message) {
    sendJson(response, 400, { error: 'Message is required.' })
    return
  }

  try {
    const reply = await createChatReply(message, apiKey)
    sendJson(response, 200, { reply })
  } catch (error) {
    sendJson(response, 500, {
      error: error instanceof Error ? error.message : 'Unexpected server error.',
    })
  }
}

