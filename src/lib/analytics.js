const VISITOR_STORAGE_KEY = 'weiyi-visitor-id'
const VISIT_SESSION_KEY = 'weiyi-visit-recorded'

function createVisitorId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().replace(/-/g, '')
  }

  return `visitor_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
}

export function getVisitorId() {
  if (typeof window === 'undefined') return ''

  const existingId = window.localStorage.getItem(VISITOR_STORAGE_KEY)
  if (existingId) return existingId

  const nextId = createVisitorId()
  window.localStorage.setItem(VISITOR_STORAGE_KEY, nextId)
  return nextId
}

function postJson(url, payload, { beacon = false } = {}) {
  if (typeof window === 'undefined') return

  if (beacon && typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
    navigator.sendBeacon(url, blob)
    return
  }

  void fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    keepalive: beacon,
  }).catch(() => {})
}

export function trackVisitor() {
  if (typeof window === 'undefined') return
  if (window.sessionStorage.getItem(VISIT_SESSION_KEY)) return

  window.sessionStorage.setItem(VISIT_SESSION_KEY, '1')

  postJson('/api/analytics/visit', {
    visitorId: getVisitorId(),
  })
}

export function trackResumeEvent(eventType) {
  if (typeof window === 'undefined') return

  postJson(
    '/api/analytics/event',
    {
      visitorId: getVisitorId(),
      eventType,
      pagePath: window.location.pathname,
    },
    { beacon: true },
  )
}
