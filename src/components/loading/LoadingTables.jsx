import Image from 'next/image'
import React from 'react'
import logo from "@/assets/logo.png"
const LoadingTables = () => {
  return (
    <div className='flex flex-col gap-4 text-2xl font-bold justify-center items-center h-screen w-full'>
      <Image className="latido" src={logo} width={300} alt='San juan de lurigancho logo'/>
      <p>Cargando datos...</p>
    </div>
  )
}

export default LoadingTables;
