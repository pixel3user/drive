import React from 'react'

export default function Uploadfilespopup({visible, close, setName ,handleSubmit}) {
    if(!visible) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='flex flex-col bg-gray-100 rounded-lg shadow-lg'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-row mt-6 mx-6'>
            <label>Folder Name: </label>
            <input required type="text" className='rounded border-2 px-2' onChange={e => setName(e.target.value)} />
            </div>

            <div className='flex flex-row justify-end mx-3'>
              <button onClick={close} className="m-2 rounded-lg px-2 bg-gray-300 hover:bg-gray-400" >close</button>
              <button className="m-2 rounded-lg px-2 bg-green-300 hover:bg-green-400" >Add Folder</button>
          </div>
        
        </form>
      </div>
    </div>
  )
}
