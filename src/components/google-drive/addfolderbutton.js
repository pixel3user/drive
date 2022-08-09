import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import Uploadfilespopup from './uploadfilespopup'
import { database } from '../../firebase'
import { addDoc } from 'firebase/firestore'
import { useAuth } from '../../contexts/authContext'

export default function Addfolderbutton({currentFolder}) {

    const [open, setopen] = useState(false)
    const [name, setName] = useState('')
    const { currentuser } = useAuth()

    function openModal(){
        setopen(true)
    }

    function closeModal(){
        setopen(false)
    }

    async function handleSubmit(e){
        e.preventDefault()

        if(currentFolder == null) return

        try{
            const docRef = await addDoc(database.folders, {
            name: name,
            parentId: currentFolder.id,
            userId: currentuser.uid,
            // path,
            createdAt: database.getCurrentTimeStamp()
        })
        console.log("Folder created with ID: ",docRef.id)
    }catch(error){
        console.log(error)
    }


        setName('')
        closeModal()
    }

  return (
    <>
        <button onClick={openModal}>
            <FontAwesomeIcon icon={faFolderPlus} />
        </button>

        <Uploadfilespopup visible={open} close={closeModal} 
                            setName={setName} handleSubmit={handleSubmit} />
    </>
  )
}
