import { Avatar } from '@mantine/core'
import React from 'react'

const Username = ({firstName,lastName}) => {
  return (
    <div className='header-name w-full flex mb-5 items-center justify-end gap-3 px-10 py-3'>
      <Avatar variant="filled" radius="sm" color="lime" src="" />
      <p className='font-semibold uppercase'>{firstName} {lastName} </p>
    </div>
  )
}

export default Username
