import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

export default function UpdateProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentuser, updatepassword, updateemail } = useAuth()

    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false)

    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        setloading(true)
        seterror('')

        const promises = []
        if(emailRef.current.value !== currentuser.email){
            promises.push(updateemail(emailRef.current.value))
        }

        if(passwordRef.current.value){
            if(passwordRef.current.value < 6){
                return seterror("Password must be 6 digits long")
            }
      
            if((passwordRef.current.value !== passwordConfirmRef.current.value)){
                return seterror("Password do not match")
            }

            promises.push(updatepassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate('/')
        }).catch(() => {
            seterror('Failed to update account')
        }).finally(() => {
            setloading(false)
        })
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className='flex flex-col'>
        <form className='flex flex-col mx-auto border-2 px-5 rounded-xl' onSubmit={handleSubmit}>
            <h2 className='mx-auto'>Update Profile</h2>
            {error}
            <div className='flex flex-col'>
                <label className='flex'>email</label>
                <input className="border-2 w-fit" ref={emailRef} required type="email" defaultValue={currentuser.email}/>
            </div>

            <div className='flex flex-col'>
                <label className='flex'>password</label>
                <input className="border-2" ref={passwordRef}  type="password" placeholder='Leave blank to keep the same'/>
            </div>

            <div className='flex flex-col'>
                <label className='flex'>confirm password</label>
                <input className="border-2" ref={passwordConfirmRef}  type="password" placeholder='Leave blank to keep the same'/>
            </div>
            

            <button disabled={loading} className='m-3 p-1 w-fit mx-auto border rounded-xl bg-yellow-600 hover:bg-yellow-100 focus:bg-gray-300'>
                Update
            </button>
        </form>
      </div>
      <div className='w-100 text-center mt-2'>
        <Link to="/">Cancel</Link>
      </div>
    </div>
  )
}
