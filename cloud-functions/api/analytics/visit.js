import { recordVisit } from '../../../lib/supabaseAdmin.js'

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
    const result = await recordVisit(body.visitorId, env)
    return json(result)
  } catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : 'Failed to record visit.',
      },
      500,
    )
  }
}
