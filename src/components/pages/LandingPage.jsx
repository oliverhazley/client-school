// LandingPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700 text-white px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 tracking-wide">Welcome to CheckYoSelf</h1>
      <p className="max-w-md text-center text-lg mb-8">
        track your mood, diet, water intake, exercises and more. sign in or sign up to start your healthy journey!
      </p>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-500 transition-all"
        >
          log in
        </Link>
        <Link
          to="/signup"
          className="px-6 py-2 bg-green-600 rounded hover:bg-green-500 transition-all"
        >
          sign up
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
