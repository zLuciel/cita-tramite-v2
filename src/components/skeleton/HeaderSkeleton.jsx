import { Skeleton } from '@mantine/core'
import React from 'react'

const HeaderSkeleton = ({styledHeader = false}) => {
  return (
    <div className={`h-screen flex flex-col gap-3 ${styledHeader ? "p-4" : ""} `}>
       <div className='flex flex-col gap-3'>
        <Skeleton height={20} />
        <Skeleton height={20} mt={6}  />
        <Skeleton height={20} mt={6} width="70%" />
       </div>
       <div className='flex flex-col gap-3'>
        <Skeleton height={20} />
        <Skeleton height={20} mt={6}  />
        <Skeleton height={20} mt={6} width="70%" />
       </div>
       <div className='flex flex-col gap-3'>
        <Skeleton height={20} />
        <Skeleton height={20} mt={6}  />
        <Skeleton height={20} mt={6} width="70%" />
       </div>
       <div className='flex flex-col gap-3'>
        <Skeleton height={20} />
        <Skeleton height={20} mt={6}  />
        <Skeleton height={20} mt={6} width="70%" />
       </div>
        
    </div>
  )
}

export default HeaderSkeleton
