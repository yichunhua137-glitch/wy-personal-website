import { recordEvent } from '../../../lib/supabaseAdmin.js'

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
}

export async function onRequestPost({ env, request }) {
  let body = {}

  try {
    body = await request.json()
  } catch {
    return json({ error: 'Request body must be valid JSON.' }, 400)
  }

  try {
    await recordEvent(body, env)
    return json({ ok: true })
  } catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : 'Failed to record event.',
      },
      500,
    )
  }
}
