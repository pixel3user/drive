import React, { useState, Fragment } from 'react'
import { useAuth } from '../contexts/authContext'
import { addDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { database, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useFolder } from '../hooks/useFolder'
import { Link, useLocation } from 'react-router-dom'
import Uploadfilespopup from './google-drive/uploadfilespopup'
import { ROOT_FOLDER } from '../hooks/useFolder'
import { Popover, Transition } from '@headlessui/react'



export default function NavBar({currentFolder,folderId}) {
    const {currentuser, logout} = useAuth()
    const [searchPopUp,setsearchPopUp] = useState(false)
    const { state = {} } = useLocation()
    const {folder, childFolders, childFiles} = useFolder(folderId,state)
    const [open, setopen] = useState(false)
    const [name, setName] = useState('')



    function handleUpload(e){
        e.preventDefault()
        const file = e.target.files[0]
        if(currentFolder== null || file == null) return

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
            
        })

        
    }

    function openModal(){
        setopen(true)
    }

    function closeModal(){
        setopen(false)
    }

    async function handleSubmit(e){
        e.preventDefault()

        if(currentFolder == null) return
        const path = [...currentFolder.path]
        if(currentFolder !== ROOT_FOLDER){
            path.push({name: currentFolder.name , id: currentFolder.id})
        }
        try{
            const docRef = await addDoc(database.folders, {
            name: name,
            parentId: currentFolder.id,
            userId: currentuser.uid,
            path: path,
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
    <div className='fixed top-0 w-full bg-white'>
        <div className='flex flex-row py-3 px-10 justify-between'>
            <span className='flex justify-center items-center text-[#919191] font-bold mr-4 h-9'>iPhotos</span>
            {currentuser && (
                <>
                    <input className="hidden w-0 sm:block sm:w-1/2 outline-none px-3 focus:shadow-lg bg-[#EEEEEE] rounded-md" placeholder='search' />
                    {searchPopUp && (
                        <div className='flex flex-row justify-center items-center w-full'>
                            <input className="h-full w-full sm:w-1/2 outline-none px-3 focus:shadow-lg bg-[#EEEEEE] rounded-md" placeholder='search' />
                            <img onClick={() => setsearchPopUp(false)} className='w-7 h-6 cursor-pointer' src='/images/back.svg' />
                        </div>
                    )}
                    {!searchPopUp && (
                        <div className='flex flex-row'>
                            <div className='flex justify-center items-center mr-4 sm:mr-10 sm:ml-2 text-[#919191] font-bold'>
                                <img onClick={() => setsearchPopUp(true)} className="w-7 h-7 cursor-pointer sm:hidden mr-2" src='/images/search.svg' />
                                <button onClick={openModal} className='flex flex-row justify-center items-center cursor-pointer mr-2'>
                                    <img className="w-7 h-7" src='/images/album.svg' />
                                    <span className='hidden sm:block'>Album</span>
                                </button>

                                <Uploadfilespopup visible={open} close={closeModal} 
                                    setName={setName} handleSubmit={handleSubmit} />

                                <label className='flex flex-row justify-center items-center cursor-pointer'>
                                    <img className="w-7 h-7" src='/images/upload.svg' />
                                    <span className='hidden sm:block'>upload</span>
                                    <input type="file" onChange={handleUpload} style={{ opacity: 0, position: 'absolute', left: '-9999px'}} />
                                </label>
                            </div>
                            <Popover className="relative">
                                {({ open }) => (
                                    <>
                                        <Popover.Button className="outline-none">
                                            <img className="flex justify-center items-center w-9 h-9 rounded-full object-cover" src={ currentuser.photoURL || "/images/avatar.svg" } />
                                        </Popover.Button>
                                        <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel>
                                                <div className='fixed w-1/2'>
                                                    <div className='flex flex-col bg-[#EEEEEE] rounded-lg w-[7.5rem] -translate-x-[3rem]'>
                                                        <Link to={'/update-profile'} className="text-sm m-2 mx-auto hover:text-green-600 font-bold" >Update Profile</Link>
                                                        <button onClick={logout} className="text-sm mb-2 hover:text-red-400 font-bold" >Logout</button>
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>
                        </div>
                    )}
                </>
            )}
        </div>
    </div>
  )
}
