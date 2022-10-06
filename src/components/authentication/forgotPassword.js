import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import NavBar from '../navbar'

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
        <NavBar />
        <div className="flex flex-col items-center justify-center h-screen">
        <div className='flex flex-col'>
          <form className='flex flex-col w-[28rem] h-[22rem] mx-auto sm:border-[1px] px-5 rounded-3xl' onSubmit={handleResetPassword}>
              <h2 className='mx-auto text-[#919191] font-bold mt-12'>iPhotos</h2>
              {error}
              {message}
              <div className='flex flex-col mx-auto mt-12'>
                  <label className='text-[#919191] text-sm font-bold'>email</label>
                  <input className="w-[22rem] outline-none px-3 py-2 focus:shadow-lg bg-[#EEEEEE] rounded-md" ref={emailRef} required type="email" />
              </div>

              <div className='flex flex-row-reverse justify-between items-center mt-12 mx-7'>
                <button disabled={loading} className='py-1 px-4 w-fit border rounded-md text-white font-bold bg-[#1a73e8] hover:bg-[#1557ad]'>
                    Send reset mail
                </button>
              </div>

              <div className='w-100 text-center mt-12'>
                Done resetting your password. <Link to="/signup" className='text-[#1557ad] font-bold'>Log in</Link>
              </div>
          </form>
        </div>
      </div>
    </>
  )
}
