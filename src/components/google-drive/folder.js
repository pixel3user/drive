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
    } className="flex flex-col w-fit items-center">
        <FontAwesomeIcon icon={faFolder} className='mr-2 h-24 w-24 text-gray-300' />
        <span className='text-gray-500'>{folder.name}</span>
    </Link>
  )
}
