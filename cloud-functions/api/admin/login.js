import { createAdminToken, verifyPassword } from '../../../lib/adminAuth.js'

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

  const password = String(body.password ?? '')
  const isValid = await verifyPassword(password, env)
  if (!isValid) {
    return json({ error: 'Invalid password.' }, 401)
  }

  const token = await createAdminToken(env)
  return json({ token })
}
