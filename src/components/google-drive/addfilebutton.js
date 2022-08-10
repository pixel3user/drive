import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { storage } from '../../firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { useAuth } from '../../contexts/authContext'

export default function AddFileButton({currentFolder}) {

    const { currentuser } = useAuth()

    function handleUpload(e){
        e.preventDefault()
        const file = e.target.files[0]
        if(currentFolder == null || file == null) return

        const filePath = currentFolder.path.length > 0 ?
        `${currentFolder.path.map( item => item.name).join('/')}/${file.name}`
        : file.name

        const uploadRef = ref(storage, `/files/${currentuser.uid}/${filePath}`)
        uploadBytes(uploadRef, file).then( snapshot => {
            console.log('Uploaded successfully')
        })
    }

  return (
    <div>
        <label className='border-2 border-green-300 rounded-lg p-1 m-0 mr-2 hover:cursor-pointer'>
            <FontAwesomeIcon icon={faFileUpload} />
            <input type="file" onChange={handleUpload} style={{ opacity: 0, position: 'absolute', left: '-9999px'}} />
        </label>
    </div>
  )
}
