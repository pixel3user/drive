import React, { useState } from 'react'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { addDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { storage } from '../../firebase'
import { database } from '../../firebase'
import { useAuth } from '../../contexts/authContext'


export default function FileUploadModal({filesUploadModal,setfilesUploadModal,currentFolder}) {
    const [selectedFiles,setselectedFiles] = useState([])
    const {currentuser} = useAuth()
    const [uploadPercentage,setuploadPercentage] = useState(0)

    function handleFiles(e){
        e.preventDefault()
        for(const [key,value] of Object.entries(e.target.files)){
            if(selectedFiles.indexOf(value) == -1){
                setselectedFiles(prev => [...prev,{value: value, URL: URL.createObjectURL(value)}])
            }
        }
    }

    function cancel(e){
        e.preventDefault()
        setselectedFiles([])
        setfilesUploadModal(false)
    }

    function handleUpload(files){
        // e.preventDefault()
        // const file = e.target.files[0]

        function uploadFile(file){

            if(currentFolder== null || file == null) return

            const filePath = currentFolder.path.length > 0 ?
            `${currentFolder.path.map( item => item.name).join('/')}/${currentFolder.name}/${file.name}`
            : file.name
            
            const uploadRef = ref(storage, `/files/${currentuser.uid}/${filePath}`)
            const uploadTask = uploadBytesResumable(uploadRef, file)
            uploadTask.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setuploadPercentage(uploadPercentage  + progress/files.length)
                    console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    // case 'running':
                    //     console.log('Upload is running');
                    //     break;
                }
            },
            (error) => {
                console.log(error)
            },
            () => {
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

            // uploadBytes(uploadRef, file).then( snapshot => {
            //     console.log('Uploaded successfully')

            //     getDownloadURL(uploadRef).then(async (url) => {
            //         const q = query((database.files), where("name","==",file.name), where("userId","==",currentuser.uid), where("folderId","==",currentFolder.id))
            //         await getDocs(q).then(existingFiles => {
            //             const existingFile = existingFiles.docs[0]
            //             if(existingFile){
            //                 updateDoc(existingFile.ref,{url: url})
            //             }else{
            //                 addDoc(database.files,{
            //                     url: url,
            //                     name: file.name,
            //                     createdAt: database.getCurrentTimeStamp(),
            //                     folderId: currentFolder.id,
            //                     userId: currentuser.uid
            //                 })
            //             }
            //         })
            //     })
            // })
        }

        files.forEach(file => uploadFile(file.value))
    }

    function CompleteUpload(e){
        e.preventDefault()
        setselectedFiles([])
        setfilesUploadModal(false)
        setuploadPercentage()
    }

  if(filesUploadModal){
    return (
        <div className='fixed inset-0 bg-white sm:bg-black sm:bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center'>
          <div className='flex flex-col w-full h-full sm:w-1/2 sm:h-2/3 sm:bg-white rounded-xl'>
            <div className='flex flex-col justify-center items-center w-full h-full overflow-auto'>
                <label onClick={() => setfilesUploadModal(true)} className='flex flex-row mx-auto cursor-pointer mt-8'>
                    <img className="w-32 h-32" src='/images/addphotos.svg' />
                    {/* <span className='hidden sm:block'>upload</span> */}
                    <input type="file" multiple="multiple" accept="image/png, image/jpeg" onChange={handleFiles} style={{ opacity: 0, position: 'absolute', left: '-9999px'}} />
                </label>
                {uploadPercentage !=0 && <span className='border-2 h-fit w-fit rounded-full p-1'>{uploadPercentage}</span>}

                <div className='grid grid-cols-4 mx-4'>{selectedFiles && selectedFiles.map(file => (
                <div key={file.value.name} className='mx-1 relative'>
                    <img className='m-1 object-fit' src={file.URL} />
                    <div onClick={() => setselectedFiles(selectedFiles.filter(doc => doc != file))} className='absolute cursor-pointer top-0 bg-white hover:bg-red-400 rounded-full'>
                        <img className='w-5 h-5 hover:w-7 hover:h-7' src='/images/cancel.svg' />
                    </div>
                </div>
                ))}
            </div>

            </div>
            

            {uploadPercentage == 100 ? (
                <div className='flex flex-row justify-end mx-3 mt-3'>
                    <button onClick={CompleteUpload} className="m-2 py-1 px-4 w-fit border rounded-md text-white font-bold bg-[#1a73e8] hover:bg-[#1557ad]">Done</button>
                </div> ) : (
                <div className='flex flex-row justify-end mx-3 mt-3'>
                    <button onClick={cancel} className="m-2 py-1 px-4 w-fit border rounded-md text-white font-bold text-red-400 hover:text-red-700" >close</button>
                    <button onClick={() => handleUpload(selectedFiles)} className="m-2 py-1 px-4 w-fit border rounded-md text-white font-bold bg-[#1a73e8] hover:bg-[#1557ad]">Add</button>
                </div>
            )}
          </div>
        </div>
      )
  }
}
