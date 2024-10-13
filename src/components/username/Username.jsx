import { Avatar } from '@mantine/core'
import React from 'react'

const Username = ({firstName,paterno,materno}) => {
  return (
    <div className='header-name w-full flex mb-5 items-center justify-end gap-3 px-10 py-3'>
      <Avatar variant="filled" radius="sm" color="lime" src="" />
      <p className='font-semibold uppercase'>{firstName} {paterno} {materno} </p>
    </div>
  )
}

export default Username
