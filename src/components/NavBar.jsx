// NavBar.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function NavBar({ token, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* App name */}
      <div className="text-2xl font-bold tracking-wide">
        <Link to="/">CheckYoSelf</Link>
      </div>

      {/* Mobile burger icon */}
      <button
        onClick={toggleMenu}
        className="md:hidden focus:outline-none"
      >
        {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      {/* Right side links */}
      <div
        className={`
          absolute md:static top-16 left-0 w-full md:w-auto bg-slate-800 md:bg-transparent
          transition-all z-10 ${menuOpen ? 'block' : 'hidden'} md:block
        `}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
          {!token && (
            <>
              <li>
                <Link
                  to="/login"
                  className="block py-2 md:py-0 hover:text-gray-300"
                  onClick={() => setMenuOpen(false)}
                >
                  >Log in
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="block py-2 md:py-0 hover:text-gray-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign up
                </Link>
              </li>
            </>
          )}

          {token && user && user.user_level !== 'admin' && (
            <li>
              <Link
                to="/dashboard"
                className="block py-2 md:py-0 hover:text-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                >Dashboard
              </Link>
            </li>
          )}

          {token && user && user.user_level === 'admin' && (
            <li>
              <Link
                to="/admin"
                className="block py-2 md:py-0 hover:text-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                >Admin panel
              </Link>
            </li>
          )}

          {token && (
            <li>
              <button
                onClick={() => {
                  onLogout()
                  setMenuOpen(false)
                }}
                className="block py-2 md:py-0 hover:text-gray-300"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
