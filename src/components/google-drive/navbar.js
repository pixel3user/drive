import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='w-100 bg-stone-200'>
        <div className='flex flex-row p-3 justify-between'>
            <Link to='/' className='mx-3' >Drive</Link>
            <Link to='/user' className='mx-3'>Profile</Link>
        </div>
    </div>
  )
}
