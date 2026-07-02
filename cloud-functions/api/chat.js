import { createChatReply } from '../../lib/portfolioAssistant.js'

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
}

export function onRequestGet() {
  return json({ status: 'ok', route: '/api/chat' })
}

export async function onRequestPost({ env, request }) {
  const apiKey = env?.DEEPSEEK_API_KEY ?? process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return json({ error: 'DeepSeek API key is not configured.' }, 500)
  }

  let body = {}

  try {
    body = await request.json()
  } catch {
    return json({ error: 'Request body must be valid JSON.' }, 400)
  }

  const message = String(body.message ?? '').trim()
  if (!message) {
    return json({ error: 'Message is required.' }, 400)
  }

  try {
    const reply = await createChatReply(message, apiKey)
    return json({ reply })
  } catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : 'Unexpected server error.',
      },
      500,
    )
  }
}

