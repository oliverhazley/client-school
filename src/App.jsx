// App.jsx
// we import the libraries we need
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'

// we import our pages/components from other files
import LandingPage from './components/pages/LandingPage.jsx'
import LoginPage from './components/pages/LoginPage.jsx'
import SignUpPage from './components/pages/SignUpPage.jsx'
import Dashboard from './components/pages/dashboard.jsx'
import AdminPage from './components/pages/AdminPage.jsx'
import NavBar from './components/NavBar.jsx'

// this component is the main part of our application
// it sets up our routes and decides where the user goes
function App() {
  // we store our user token here
  const [token, setToken] = useState(null)
  // we also store the user's data (like user_level) in state
  const [user, setUser] = useState(null)

  // this function will check if we already have a token in local storage
  // if we do, we fetch the user info from the backend
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    if (storedToken) {
      setToken(storedToken)
      fetchMe(storedToken)
    }
  }, [])

  // this function calls our backend to fetch user info
  const fetchMe = async (jwtToken) => {
    try {
      // we send a request to the protected endpoint /api/auth/me
      // which returns user info if the token is good
      const res = await axios.get('https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/auth/me', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      setUser(res.data.user) 
    } catch (error) {
      console.log('error fetching /me', error)
      // if error, maybe remove invalid token
      localStorage.removeItem('authToken')
      setToken(null)
      setUser(null)
    }
  }

  // this function logs the user out
  // we remove the token from local storage
  // and clear the user state
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null)
    setUser(null)
  }

  return (
    <Router>
      {/* navbar is shown on every page, so we put it here
          we pass token and user info so it knows if user is logged in */}
      <NavBar 
        token={token} 
        user={user} 
        onLogout={handleLogout} 
      />

      {/* we define all our routes here */}
      <Routes>
        {/* landing page => always visible */}
        <Route path="/" element={<LandingPage />} />

        {/* login page => if user is already logged in, we can redirect to dashboard */}
        <Route 
          path="/login" 
          element={
            token ? <Navigate to="/dashboard" /> : <LoginPage 
              onLogin={(tokenValue, userData) => {
                // when the user logs in successfully
                setToken(tokenValue)
                setUser(userData)
                localStorage.setItem('authToken', tokenValue)
              }} 
            />
          } 
        />

        {/* signup page => similar logic to login */}
        <Route 
          path="/signup" 
          element={
            token ? <Navigate to="/dashboard" /> : <SignUpPage />
          } 
        />

        {/* dashboard => only show if user is logged in and is NOT admin
            if user is admin, we send them to admin page
            if not logged in, send them back to login
        */}
        <Route 
          path="/dashboard" 
          element={
            token 
              ? (user && user.user_level === 'admin')
                ? <Navigate to="/admin" /> 
                : <Dashboard token={token} user={user} />
              : <Navigate to="/" />
          } 
        />

        {/* admin page => only show if user is admin */}
        <Route 
          path="/admin" 
          element={
            token 
              ? (user && user.user_level === 'admin')
                ? <AdminPage token={token} />
                : <Navigate to="/dashboard" />
              : <Navigate to="/login" />
          } 
        />

        {/* any other url => go to landing page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
