import { verifyAdminToken } from '../../../lib/adminAuth.js'
import { getAdminStats } from '../../../lib/supabaseAdmin.js'

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
}

export async function onRequestGet({ env, request }) {
  const authorization = request.headers.get('authorization') ?? ''
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : ''
  const isAuthorized = await verifyAdminToken(token, env)

  if (!isAuthorized) {
    return json({ error: 'Unauthorized.' }, 401)
  }

  try {
    const stats = await getAdminStats(env)
    return json(stats)
  } catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : 'Failed to load admin stats.',
      },
      500,
    )
  }
}
