// SignUpPage.jsx
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUpPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    try {
      await axios.post('https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/users', {
        username,
        password,
        email
      })
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      console.error('signup error', err)
      setError('could not create account. please check your data.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700 text-white px-4">
      <div className="max-w-md w-full bg-slate-900 p-8 rounded shadow-lg">
        <h2 className="text-3xl font-bold mb-6">create an account</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4">
            account created! redirecting to login...
          </p>
        )}

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
            <label className="block mb-1">email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-slate-700 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            className="w-full py-2 bg-green-600 rounded hover:bg-green-500 transition-colors"
          >
            sign up
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
