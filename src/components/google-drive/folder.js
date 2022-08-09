import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

export default function Folder({folder}) {
  return (
    <Link className='px-6 py-1 bg-grey-400 rounded-lg'>
        <FontAwesomeIcon icon={faFolder} className='mr-2'>
            {folder.name}
        </FontAwesomeIcon>
    </Link>
  )
}
