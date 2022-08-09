import React from 'react'
import { useFolder } from '../../hooks/useFolder'
import Addfolderbutton from './addfolderbutton'
import Folder from './folder'
import Navbar from './navbar'

export default function Dashboard() {

  const {folder, childFolders} = useFolder("JBKBYpAU1fZjTCAZj0V9")
  console.log(childFolders)

  return (
    <>
        <Navbar />
        <div className='flex flex-col w-100 m-3'>
            <div className='flex flex-row justify-between'>
                content
                <Addfolderbutton currentFolder={folder}/>
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
