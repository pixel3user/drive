import React from 'react'
import Addfolderbutton from './addfolderbutton'
import Navbar from './navbar'

export default function Dashboard() {
  return (
    <>
        <Navbar />
        <div className='flex flex-col w-100 m-3'>
            <div className='flex flex-row justify-between'>
                content
                <Addfolderbutton />
            </div>
        </div>
    </>
  )
}
