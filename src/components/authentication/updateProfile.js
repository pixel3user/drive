import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { storage } from '../../firebase'
import NavBar from '../navbar'

export default function UpdateProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentuser, updatepassword, updateemail, setProfilePic } = useAuth()

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

    function handleUpload(e){
        e.preventDefault()
        const file = e.target.files[0]

        const uploadRef = ref(storage, `/files/${currentuser.uid}/profilePic/${file.name}`)
        // const uploadTask = uploadBytes(uploadRef, file)
        // uploadTask.on('state_changed', snapshot => {
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         console.log('Upload is ' + progress + '% done');
        //     switch (snapshot.state) {
        //         case 'paused':
        //             console.log('Upload is paused');
        //             break;
        //         case 'running':
        //             console.log('Upload is running');
        //             break;
        //     }
        // },
        // (error) => {
        //     console.log(error)
        // },
        // () => {
        //     getDownloadURL(uploadRef).then((url) => {
        //         console.log(url)
        //     })
        // })
        uploadBytes(uploadRef, file).then( snapshot => {
            console.log('Uploaded successfully')

            getDownloadURL(uploadRef).then(async (url) => {
                setProfilePic(url)
            })
            
        })

        
    }

  return (
    <>
        <NavBar />
        {/* <div className="flex flex-col items-center justify-center h-screen mt-20">
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
        </div> */}
        <div className="flex flex-col items-center justify-center mt-12 sm:mt-24">
        <div className='flex flex-col'>
          <form className='flex flex-col sm:w-[28rem] sm:h-[32rem] mx-auto sm:border-[1px] px-5 rounded-3xl' onSubmit={handleSubmit}>
              <h2 className='mx-auto text-[#919191] font-bold mt-8'>iPhotos</h2>
              {error}
              
              <label className='flex flex-col justify-center items-center cursor-pointer mt-6'>
                <img className="w-7 h-7" src='/images/upload.svg' />
                <span className='text-[#919191] font-bold'>upload profile photo</span>
                <input type="file" onChange={handleUpload} style={{ opacity: 0, position: 'absolute', left: '-9999px'}} />
              </label>

              <div className='flex flex-col mx-auto mt-8'>
                  <label className='text-[#919191] text-sm font-bold'>email</label>
                  <input className="w-[22rem] outline-none px-3 py-2 focus:shadow-lg bg-[#EEEEEE] rounded-md" ref={emailRef} required type="email" />
              </div>

              <div className='flex flex-col mx-auto mt-8'>
                  <label className='text-[#919191] text-sm font-bold'>password</label>
                  <input className="w-[22rem] outline-none px-3 py-2 focus:shadow-lg bg-[#EEEEEE] rounded-md" ref={passwordRef} required type="password"
                   placeholder='Leave blank to keep the same' />
              </div>

              <div className='flex flex-col mx-auto mt-8'>
                  <label className='text-[#919191] text-sm font-bold'>confirm password</label>
                  <input className="w-[22rem] outline-none px-3 py-2 focus:shadow-lg bg-[#EEEEEE] rounded-md" ref={passwordConfirmRef} required type="password"
                    placeholder='Leave blank to keep the same' />
              </div>

              <div className='flex flex-row justify-between items-center mt-12 mx-7'>
                <Link to="/" className='text-red-500 hover:text-red-700 font-bold'>Cancel</Link>
                <button disabled={loading} className='py-1 px-4 w-fit border rounded-md text-white font-bold bg-[#1a73e8] hover:bg-[#1557ad]'>
                    Update
                </button>
              </div>
          </form>
        </div>
      </div>
    </>
  )
}
