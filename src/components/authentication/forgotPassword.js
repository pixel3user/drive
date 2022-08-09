import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

export default function ForgotPassword() {

    const emailRef = useRef()

    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false)
    const [message, setMessage ] = useState('')

    const { resetpassword } = useAuth()

    async function handleResetPassword(e){
        e.preventDefault()

        try{
            setMessage('')
            seterror('')
            setloading(true)
            await resetpassword(emailRef.current.value)
            setMessage('Check your inbox for instruction')
        }catch{
            seterror("Failed to reset password")
        }
        
    }

  return (
    <>
        <div className='flex flex-col'>
        <form className='flex flex-col mx-auto border-2 px-5 rounded-xl' onSubmit={handleResetPassword}>
            <h2 className='mx-auto'>Reset password</h2>
            {error}
            {message}
            <div className='flex flex-col'>
                <label className='flex'>email</label>
                <input className="border-2 w-fit" ref={emailRef} required type="email" />
            </div>

            <button disabled={loading} className='m-3 p-1 w-fit mx-auto border rounded-xl bg-yellow-600 hover:bg-yellow-100 focus:bg-gray-300'>
                Rest password
            </button>
        </form>
      </div>
      <div className='w-100 text-center mt-2'>
        <Link to="/login">Login</Link>
      </div>
    </>
  )
}
