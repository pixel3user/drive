import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

export default function Folder({folder}) {
  return (
    <Link to={
      {
        pathname: `/folder/${folder.id}`,
        state: { folder: folder }
      }
    }>
        <div className='w-full px-2 py-1 bg-gray-100 rounded-lg border-2 border-black hover:bg-gray-300'>
            <FontAwesomeIcon icon={faFolder} className='mr-2' />
            {folder.name}
        </div>
    </Link>
  )
}
