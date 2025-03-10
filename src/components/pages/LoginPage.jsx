// LoginPage.jsx
import React, { useState } from 'react'
import axios from 'axios'

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await axios.post('https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/auth/login', {
        username,
        password
      })

      const userData = {
        user_id: res.data.user_id,
        username: res.data.username,
        email: res.data.email,
        user_level: res.data.user_level
      }
      const token = res.data.token
      onLogin(token, userData)

    } catch (err) {
      console.error('login error', err)
      setError('invalid username or password')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700 text-white px-4">
      <div className="max-w-md w-full bg-slate-900 p-8 rounded shadow-lg">
        <h2 className="text-3xl font-bold mb-6">log in</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1">username</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-slate-700 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-slate-700 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 rounded hover:bg-blue-500 transition-colors"
          >
            login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
