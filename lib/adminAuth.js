const FALLBACK_PASSWORD_HASH = '903386081382142713360648701d463d71afc9be734a1b38b9e9e7681b52baa2'
const TOKEN_TTL_MS = 1000 * 60 * 60 * 12

function readEnv(env, key) {
  return env?.[key] ?? process.env[key] ?? ''
}

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function sha256(value) {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return toHex(digest)
}

async function hmacSha256(secret, value) {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    {
      name: 'HMAC',
      hash: 'SHA-256',
    },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value))
  return toHex(signature)
}

async function resolvePasswordHash(env) {
  const plainPassword = readEnv(env, 'ADMIN_PAGE_PASSWORD')
  if (plainPassword) return sha256(plainPassword)

  const configuredHash = readEnv(env, 'ADMIN_PAGE_PASSWORD_HASH')
  if (configuredHash) return configuredHash.toLowerCase()

  return FALLBACK_PASSWORD_HASH
}

async function resolveSessionSecret(env) {
  const configuredSecret = readEnv(env, 'ADMIN_SESSION_SECRET')
  if (configuredSecret) return configuredSecret

  return resolvePasswordHash(env)
}

export async function verifyPassword(password, env) {
  const expectedHash = await resolvePasswordHash(env)
  const candidateHash = await sha256(String(password ?? ''))
  return candidateHash === expectedHash
}

export async function createAdminToken(env) {
  const payload = JSON.stringify({
    exp: Date.now() + TOKEN_TTL_MS,
  })
  const encodedPayload = encodeURIComponent(payload)
  const secret = await resolveSessionSecret(env)
  const signature = await hmacSha256(secret, encodedPayload)
  return `${encodedPayload}.${signature}`
}

export async function verifyAdminToken(token, env) {
  const [encodedPayload, providedSignature] = String(token ?? '').split('.')
  if (!encodedPayload || !providedSignature) return false

  const secret = await resolveSessionSecret(env)
  const expectedSignature = await hmacSha256(secret, encodedPayload)
  if (expectedSignature !== providedSignature) return false

  try {
    const payload = JSON.parse(decodeURIComponent(encodedPayload))
    return Number(payload.exp ?? 0) > Date.now()
  } catch {
    return false
  }
}
