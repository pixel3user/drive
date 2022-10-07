import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { useFolder } from '../../hooks/useFolder'
import AddFileButton from './addfilebutton'
import Addfolderbutton from './addfolderbutton'
import File from './file'
import Folder from './folder'
import FolderPath from './folderpath'
import NavBar from '../navbar'

export default function Dashboard() {
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const {folder, childFolders, childFiles} = useFolder(folderId,state)
  return (
    <>
        <NavBar folderId={folderId} currentFolder={folder}/>
        <div className='flex flex-col w-100 mt-20'>
            <div className='flex flex-col sm:mx-8 justify-between'>
            <FolderPath currentFolder={folder} />
                {/* <Addfolderbutton currentFolder={folder}/> */}
                {/* <AddFileButton currentFolder={folder} /> */}
                <div className='flex flex-col'>
                  {childFolders.length>0 && (
                    <>
                      <span className='m-2 text-[#919191] text-sm font-bold'>Albums</span>
                      <div className='grid grid-cols-3 sm:grid-cols-8'>
                        {childFolders.map(childFolder => (
                          <div key={childFolder.id} style={{maxWidth: "250px"}} className='p-2'>
                            <Folder folder={childFolder} />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {/* {childFolders.length > 0 && childFiles.length > 0 && <hr />} */}

                  {childFiles.length>0 && (
                    <>
                      <span className='m-2 text-[#919191] text-sm font-bold'>Photos</span>
                      <div className='grid grid-cols-2 sm:grid-cols-5'>
                        {childFiles.map(childFile => (
                          <div key={childFile.name} className='p-[1px]'>
                            <File file={childFile} />
                          </div>
                            ))}
                      </div>
                    </>
                  )}

                </div>
            </div>
        </div>
    </>
  )
}
