import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

export default function Profile() {

    const [error, seterror] = useState('')

    const { currentuser, logout } = useAuth()

    const navigate = useNavigate()
    
    async function handleLogout(){
        seterror('')

        try{
            await logout()
            navigate('/login')
        }catch{
            seterror("Failed to log out")
        }
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className='flex flex-col border-2 rounded-xl p-3'>
        <h2 className='mx-auto m-2'>Profile</h2>
        {error}
        <strong className='m-2'>Email: {currentuser.email}</strong>
        <Link className='mx-auto m-2 border-2 px-5 rounded-lg bg-yellow-500 hover:bg-yellow-100' to="/update-profile">Update Profile</Link>
      </div>
      <div className='w-100 text-center mt-2 border-2 px-3 rounded-lg bg-red-400 hover:bg-red-300'>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  )
}
