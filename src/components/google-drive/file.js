import React, { useState } from 'react'
import FileSaver from "file-saver"
import { deleteDoc, doc } from 'firebase/firestore'
import { database } from '../../firebase'

export default function File({file}) {
  const [showPhoto,setshowPhoto] = useState(false)

  const downloadImage = (imageUrl,imageName) => {
    FileSaver.saveAs(imageUrl,imageName)
  }

  async function deleteImage(e){
    e.preventDefault()
    await deleteDoc(database.file(file.id)).then(() => {
      // setshowPhoto(false)
    })

  }

  return (
    <>
      <div onClick={() => setshowPhoto(true)} target="_blank" className='w-full cursor-pointer'>
          {/* <FontAwesomeIcon icon={faFile} className="mr-2" /> */}
          {/* {file.name} */}
          <img src={file.url} />
      </div>

      {showPhoto && (
        <div className='fixed inset-0 bg-black bg-opacity-80 backdrop-blur-lg flex flex-col'>

          <div className='flex justify-between bg-black px-3 py-1'>
            <div onClick={() => setshowPhoto(false)} className='text-white cursor-pointer'>
              <img className='w-7 h-7' src='/images/arrowback.svg' />
            </div>
            <div className='flex flex-row'>
              <button onClick={() => downloadImage(file.url,file.name)} className='text-white mr-3'>
                <img className='w-7 h-7' src='/images/download.svg' />
              </button>

              <button onClick={deleteImage}>
                <img className='w-7 h-7' src='/images/delete.svg' />
              </button>
            </div>
          </div>
          <div className='flex justify-center items-center h-full'>
            <div className='bg-white w-full'>
              <img src={file.url} />
            </div>
          </div>

        </div>
      )}
    </>
  )
}
