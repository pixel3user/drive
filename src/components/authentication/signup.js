import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

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

        if(passwordRef.current.value < 6){
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
          seterror("Failed to create and account")
        }

        setloading(false)
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className='flex flex-col'>
        <form className='flex flex-col mx-auto border-2 px-5 rounded-xl' onSubmit={handleSubmit}>
            <h2 className='mx-auto'>Sign up</h2>
            {error}
            <div className='flex flex-col'>
                <label className='flex'>email</label>
                <input className="border-2 w-fit" ref={emailRef} required type="email" />
            </div>

            <div className='flex flex-col'>
                <label className='flex'>password</label>
                <input className="border-2" ref={passwordRef} required type="password" />
            </div>

            <div className='flex flex-col'>
                <label className='flex'>confirm password</label>
                <input className="border-2" ref={passwordConfirmRef} required type="password" />
            </div>
            

            <button disabled={loading} className='m-3 p-1 w-fit mx-auto border rounded-xl bg-yellow-600 hover:bg-yellow-100 focus:bg-gray-300'>
                SignUp
            </button>
        </form>
      </div>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  )
}
