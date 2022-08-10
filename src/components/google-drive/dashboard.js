import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useFolder } from '../../hooks/useFolder'
import AddFileButton from './addfilebutton'
import Addfolderbutton from './addfolderbutton'
import Folder from './folder'
import FolderPath from './folderpath'
import Navbar from './navbar'

export default function Dashboard() {
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const {folder, childFolders} = useFolder(folderId,state)

  return (
    <>
        <Navbar />
        <div className='flex flex-col w-100 m-3'>
            <div className='flex flex-row justify-between'>
            <FolderPath currentFolder={folder} />
                <Addfolderbutton currentFolder={folder}/>
                <AddFileButton currentFolder={folder} />
                {childFolders.length>0 && (
                  <div className='flex flex-row'>
                    {childFolders.map(childFolder => (
                      <div key={childFolder.id} style={{maxWidth: "250px"}} className='p-2'>
                        <Folder folder={childFolder} />
                      </div>
                    ))}
                  </div>
                )}
            </div>
        </div>
    </>
  )
}
