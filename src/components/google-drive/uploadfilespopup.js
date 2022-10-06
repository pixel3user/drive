import React from 'react'

export default function Uploadfilespopup({visible, close, setName ,handleSubmit}) {
    if(!visible) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='flex flex-col bg-white rounded-md'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col mt-6 mx-6'>
            <label className='mb-2'>Album Name: </label>
            <input required type="text" className='text-black font-normal focus:shadow-lg bg-[#EEEEEE] outline-none rounded-md px-4 py-2' onChange={e => setName(e.target.value)} />
          </div>

          <div className='flex flex-row justify-end mx-3 mt-3'>
              <button onClick={close} className="m-2 text-sm text-red-400 hover:text-red-700" >close</button>
              <button className="m-2 text-sm text-[#1a73e8] hover:text-[#1557ad]" >Add Album</button>
          </div>
        
        </form>
      </div>
    </div>
  )
}
