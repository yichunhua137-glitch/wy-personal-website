import { useEffect, useState } from 'react'

const ADMIN_TOKEN_KEY = 'weiyi-admin-token'

function formatEventLabel(eventType) {
  if (eventType === 'resume_open') return 'Resume opened'
  if (eventType === 'resume_download') return 'Resume downloaded'
  return eventType
}

function formatDateTime(value) {
  if (!value) return ''

  return new Intl.DateTimeFormat('en-CA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function AdminPage() {
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(() => window.localStorage.getItem(ADMIN_TOKEN_KEY) ?? '')
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const loadStats = async (authToken) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        if (response.status === 401) {
          window.localStorage.removeItem(ADMIN_TOKEN_KEY)
          setToken('')
          throw new Error('Session expired. Please log in again.')
        }

        throw new Error(payload.error || 'Failed to load admin stats.')
      }

      setStats(payload)
      setStatus({ type: 'success', message: 'Analytics loaded.' })
    } catch (error) {
      setStats(null)
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to load admin stats.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!token) return
    void loadStats(token)
  }, [token])

  const handleLogin = async (event) => {
    event.preventDefault()
    if (isAuthenticating) return

    setIsAuthenticating(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok || !payload.token) {
        throw new Error(payload.error || 'Login failed.')
      }

      window.localStorage.setItem(ADMIN_TOKEN_KEY, payload.token)
      setToken(payload.token)
      setPassword('')
      setStatus({ type: 'success', message: 'Admin access granted.' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Login failed.',
      })
    } finally {
      setIsAuthenticating(false)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY)
    setToken('')
    setStats(null)
    setStatus({ type: '', message: '' })
  }

  return (
    <section className="section page-section admin-page">
      <div className="admin-shell panel">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Admin</p>
            <h2>Portfolio analytics</h2>
            <p className="admin-copy">
              View unique visitors, total visits, and how often the resume PDF is opened or downloaded.
            </p>
          </div>
          {token && (
            <div className="admin-header-actions">
              <button className="button secondary" onClick={() => void loadStats(token)} type="button">
                Refresh
              </button>
              <button className="button secondary" onClick={handleLogout} type="button">
                Log Out
              </button>
            </div>
          )}
        </div>

        {!token ? (
          <form className="admin-login-card" onSubmit={handleLogin}>
            <label className="contact-field">
              <span>Password</span>
              <input
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
                required
                type="password"
                value={password}
              />
            </label>
            <div className="contact-form-actions">
              <button className="button primary" disabled={isAuthenticating} type="submit">
                {isAuthenticating ? 'Checking...' : 'Enter Admin'}
              </button>
            </div>
          </form>
        ) : (
          <div className="admin-dashboard">
            <div className="admin-stats-grid">
              <article className="panel admin-metric-card">
                <p className="eyebrow">Visitors</p>
                <strong>{stats?.uniqueVisitors ?? 0}</strong>
                <span>Unique visitors</span>
              </article>
              <article className="panel admin-metric-card">
                <p className="eyebrow">Traffic</p>
                <strong>{stats?.totalVisits ?? 0}</strong>
                <span>Total visits</span>
              </article>
              <article className="panel admin-metric-card">
                <p className="eyebrow">Resume</p>
                <strong>{stats?.resumeOpens ?? 0}</strong>
                <span>PDF opens</span>
              </article>
              <article className="panel admin-metric-card">
                <p className="eyebrow">Resume</p>
                <strong>{stats?.resumeDownloads ?? 0}</strong>
                <span>PDF downloads</span>
              </article>
            </div>

            <article className="panel admin-events-card">
              <div className="admin-events-head">
                <h3>Recent activity</h3>
                <span>{stats?.lastUpdated ? `Updated ${formatDateTime(stats.lastUpdated)}` : ''}</span>
              </div>
              <div className="admin-events-list">
                {stats?.recentEvents?.length ? (
                  stats.recentEvents.map((item, index) => (
                    <div className="admin-event-row" key={`${item.event_type}-${item.created_at}-${index}`}>
                      <strong>{formatEventLabel(item.event_type)}</strong>
                      <span>{item.page_path || '/'}</span>
                      <time>{formatDateTime(item.created_at)}</time>
                    </div>
                  ))
                ) : (
                  <p className="admin-empty">No tracked events yet.</p>
                )}
              </div>
            </article>
          </div>
        )}

        {status.message && (
          <p className={status.type === 'success' ? 'contact-status success' : 'contact-status error'}>
            {status.message}
          </p>
        )}
      </div>
    </section>
  )
}

export default AdminPage
