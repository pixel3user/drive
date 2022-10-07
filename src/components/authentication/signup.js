import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import NavBar from '../navbar'

export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()

    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value.length < 6){
          return seterror("Password must be 6 digits long")
        }

        if((passwordRef.current.value !== passwordConfirmRef.current.value)){
          return seterror("Password do not match")
        }

        try{
          seterror('')
          setloading(true)
          await signup(emailRef.current.value,passwordRef.current.value)
          navigate("/")
        }catch{
          seterror("Failed to create an account")
        }

        setloading(false)
    }

  return (
    <>
      <div className='hidden sm:block'>
        <NavBar />
      </div>
      <div className="flex flex-col items-center justify-center sm:h-screen">
        <div className='flex flex-col'>
          <form className='flex flex-col sm:w-[28rem] sm:h-[30rem] mx-auto sm:border-[1px] px-5 rounded-3xl' onSubmit={handleSubmit}>
              <h2 className='mx-auto text-[#919191] font-bold mt-12'>iPhotos</h2>
              <span className='mx-auto text-red-400 font-bold mt-4'>{error}</span>
              <div className='flex flex-col mx-auto mt-8'>
                  <label className='text-[#919191] text-sm font-bold'>email</label>
                  <input className="w-[22rem] outline-none px-3 py-2 focus:shadow-lg bg-[#EEEEEE] rounded-md" ref={emailRef} required type="email" />
              </div>

              <div className='flex flex-col mx-auto mt-8'>
                  <label className='text-[#919191] text-sm font-bold'>password</label>
                  <input className="w-[22rem] outline-none px-3 py-2 focus:shadow-lg bg-[#EEEEEE] rounded-md" ref={passwordRef} required type="password" />
              </div>

              <div className='flex flex-col mx-auto mt-8'>
                  <label className='text-[#919191] text-sm font-bold'>confirm password</label>
                  <input className="w-[22rem] outline-none px-3 py-2 focus:shadow-lg bg-[#EEEEEE] rounded-md" ref={passwordConfirmRef} required type="password" />
              </div>

              <div className='flex flex-row justify-between items-center mt-12'>
                <div className='w-100 mt-5 text-center mr-4'>
                  Already have an account. <Link to="/login" className='text-[#1557ad] font-bold'>Log in</Link>
                </div>
                <button disabled={loading} className='py-1 px-4 w-fit border rounded-md text-white font-bold bg-[#1a73e8] hover:bg-[#1557ad]'>
                    Sign up
                </button>
              </div>

          </form>
        </div>
      </div>
    </>
  )
}
