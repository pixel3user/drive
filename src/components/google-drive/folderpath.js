import React from 'react'
import { Link } from 'react-router-dom'
import { ROOT_FOLDER } from '../../hooks/useFolder'

export default function FolderPath({currentFolder}) {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if(currentFolder) path = [...path, ...currentFolder.path]
    return (
    <div className='flex flex-row'>
        {path.map((folder,index) => (
            <div key={folder.id} className="px-0.5">
                <Link to={
                    {
                        pathname: folder.id ? `/folder/${folder.id}` : "/",
                        state: { folder: { ...folder, path: path.slice(1,index)}},
                    }
                }>
                    {folder.name} /
                </Link>
            </div>
        ))}
    </div>
  )
}
