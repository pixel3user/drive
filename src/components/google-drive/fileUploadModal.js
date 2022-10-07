import React, { useState } from 'react'

export default function FileUploadModal({filesUploadModal,setfilesUploadModal,handleUpload}) {
    const [selectedFiles,setselectedFiles] = useState([])
    function handleFiles(e){
        e.preventDefault()
        for(const [key,value] of Object.entries(e.target.files)){
            if(selectedFiles.indexOf(value) == -1){
                setselectedFiles(prev => [...prev,{value: value, URL: URL.createObjectURL(value)}])
            }
        }
    }
    async function upload(e){
        e.preventDefault()

        handleUpload(selectedFiles)
            setselectedFiles([])
            setfilesUploadModal(false)
    }

    function cancel(e){
        e.preventDefault()
        setselectedFiles([])
        setfilesUploadModal(false)
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

                <div className='grid grid-cols-4 mx-4'>{selectedFiles && selectedFiles.map(file => (
                <div className='mx-1 relative'>
                    <img key={file.value.name} className='m-1 object-fit' src={file.URL} />
                    <div onClick={() => setselectedFiles(selectedFiles.filter(doc => doc != file))} className='absolute cursor-pointer top-0 bg-white hover:bg-red-400 rounded-full'>
                        <img className='w-5 h-5 hover:w-7 hover:h-7' src='/images/cancel.svg' />
                    </div>
                </div>
                ))}
            </div>

            </div>
            

            <div className='flex flex-row justify-end mx-3 mt-3'>
                <button onClick={cancel} className="m-2 py-1 px-4 w-fit border rounded-md text-white font-bold text-red-400 hover:text-red-700" >close</button>
                <button onClick={upload} className="m-2 py-1 px-4 w-fit border rounded-md text-white font-bold bg-[#1a73e8] hover:bg-[#1557ad]">Add</button>
            </div>
          </div>
        </div>
      )
  }
}
