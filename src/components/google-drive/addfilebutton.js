import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { database, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useAuth } from '../../contexts/authContext'
import { addDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'

export default function AddFileButton({currentFolder}) {

    const { currentuser } = useAuth()

    function handleUpload(e){
        e.preventDefault()
        const file = e.target.files[0]
        if(currentFolder == null || file == null) return

        const filePath = currentFolder.path.length > 0 ?
        `${currentFolder.path.map( item => item.name).join('/')}/${currentFolder.name}/${file.name}`
        : file.name
        
        const uploadRef = ref(storage, `/files/${currentuser.uid}/${filePath}`)
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
        })

        getDownloadURL(uploadRef).then(async (url) => {
            const q = query((database.files), where("name","==",file.name), where("userId","==",currentuser.uid), where("folderId","==",currentFolder.id))
            await getDocs(q).then(existingFiles => {
                const existingFile = existingFiles.docs[0]
                if(existingFile){
                    updateDoc(existingFile.ref,{url: url})
                }else{
                    addDoc(database.files,{
                        url: url,
                        name: file.name,
                        createdAt: database.getCurrentTimeStamp(),
                        folderId: currentFolder.id,
                        userId: currentuser.uid
                    })
                }
            })
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
