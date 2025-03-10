// AdminPage.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AdminPage({ token }) {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError('')
        const res = await axios.get('https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUsers(res.data)
      } catch (err) {
        console.error('error fetching users', err)
        setError('failed to load users')
      }
    }
    fetchUsers()
  }, [token])

  const deleteUser = async (userId) => {
    try {
      setSuccess('')
      setError('')
      await axios.delete(`https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuccess('user deleted successfully')
      // refetch
      const res = await axios.get('https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(res.data)
    } catch (err) {
      console.error('error deleting user', err)
      setError('failed to delete user')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">admin management</h1>

      {error && <div className="bg-red-600 p-2 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-600 p-2 rounded mb-4">{success}</div>}

      <div className="mt-4 space-y-4">
        {users.map(u => (
          <div
            key={u.user_id}
            className="flex items-center justify-between bg-slate-700 p-4 rounded shadow"
          >
            <div>
              <p className="text-lg font-semibold capitalize">{u.username}</p>
              <p className="text-sm text-gray-300">email: {u.email}</p>
              <p className="text-sm text-gray-400">level: {u.user_level}</p>
            </div>
            {u.user_level !== 'admin' && (
              <button
                onClick={() => deleteUser(u.user_id)}
                className="bg-red-600 px-3 py-1 text-sm rounded hover:bg-red-500 transition-colors"
              >
                delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPage
