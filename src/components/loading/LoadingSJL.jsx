import Image from 'next/image'
import React from 'react'
import logo from "@/assets/logo.png"
const LoadingSJL = () => {
  return (
    <div className='flex text-2xl font-bold justify-center items-center h-screen w-full'>
      <Image className="latido" src={logo} width={300} alt='San juan de lurigancho logo'/>
    </div>
  )
}

export default LoadingSJL

