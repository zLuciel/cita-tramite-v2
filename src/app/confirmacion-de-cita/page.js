"use client"
import withAuth from '@/auth/withAuth'
import VisualCita from '@/components/visualCita/VisualCita'
import { useProduct } from '@/provider/ProviderContext'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const {user} = useProduct()
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div className='w-full h-screen login-page flex text-white justify-center items-center'>
      <VisualCita id={id} token={user.token} />
    </div>
  )
}

export default withAuth(Page,"user")