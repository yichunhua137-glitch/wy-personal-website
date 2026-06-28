import { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { navItems } from '../siteData'

function Layout() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.Sakura) return undefined

    const sakura = new window.Sakura('body', {
      delay: 440,
      fallSpeed: 1.25,
      minSize: 10,
      maxSize: 16,
      colors: [
        {
          gradientColorStart: 'rgba(255, 209, 228, 0.95)',
          gradientColorEnd: 'rgba(245, 160, 198, 0.9)',
          gradientColorDegree: 110,
        },
        {
          gradientColorStart: 'rgba(255, 239, 245, 0.96)',
          gradientColorEnd: 'rgba(246, 188, 213, 0.92)',
          gradientColorDegree: 90,
        },
      ],
    })

    return () => {
      sakura.stop(true)
    }
  }, [])

  return (
    <main className="site-shell">
      <div className="page-glow page-glow-left" aria-hidden="true"></div>
      <div className="page-glow page-glow-right" aria-hidden="true"></div>

      <header className="topbar">
        <NavLink className="brand" to="/">
          WeiYi
        </NavLink>
        <nav className="nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end={item.to === '/'}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Outlet />
    </main>
  )
}

export default Layout
