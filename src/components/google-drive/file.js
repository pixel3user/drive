import React, { useState } from 'react'
import FileSaver from "file-saver"
import { deleteDoc, doc } from 'firebase/firestore'
import { database, storage } from '../../firebase'
import { deleteObject, ref } from 'firebase/storage'
import { useAuth } from '../../contexts/authContext'

export default function File({file,currentFolder}) {
  const [showPhoto,setshowPhoto] = useState(false)
  const {currentuser} = useAuth()

  const downloadImage = (imageUrl,imageName) => {
    FileSaver.saveAs(imageUrl,imageName)
  }

  async function deleteImage(e){
    e.preventDefault()
    try{
      await deleteDoc(database.file(file.id)).then(() => {
        const filePath = currentFolder.path.length > 0 ?
            `${currentFolder.path.map( item => item.name).join('/')}/${currentFolder.name}/${file.name}`
            : file.name
        const deleteRef = ref(storage, `/files/${currentuser.uid}/${filePath}`)
        deleteObject(deleteRef).then(() => {
          setshowPhoto(false)
        })
      })
    }catch(e){
      console.log(e)
    }
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
            <div className='w-full sm:h-full'>
              <img className='w-full h-full object-contain' src={file.url} />
            </div>
          </div>

        </div>
      )}
    </>
  )
}
