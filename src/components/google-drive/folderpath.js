import React from 'react'
import { Link } from 'react-router-dom'
import { ROOT_FOLDER } from '../../hooks/useFolder'

export default function FolderPath({currentFolder}) {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if(currentFolder) path = [...path, ...currentFolder.path]

    return (
    <div className='flex flex-row m-2 text-[#919191] text-sm font-bold'>
        {path[path.length - 2] != undefined && (

            <Link to={
                {
                    pathname: path[path.length - 2].id != null ? `/folder/${path[path.length - 2].id}` : "/",
                    state: { folder: { ...path[path.length - 2 ], path: path.slice(1,(path.length - 2))}}
                }
            } className='flex items-center justify-center'>
                <img className='w-5 h-5 bg-gray-200 rounded-full' src='/images/arrowback.svg' />
            </Link>

        )}
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
