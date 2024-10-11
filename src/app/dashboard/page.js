"use client"
import withAuth from '@/auth/withAuth'
import Movil from '@/components/header/Movil'
import TableUser from '@/dashboard/components/tableUser/TableUser'
import { useProduct } from '@/provider/ProviderContext'
import React from 'react'

const Page = () => {
  const {allUser} = useProduct()
  return (
    <div className="">
      {<Movil role={"super user"} />}
      <main className="bg-white p-10">
        <TableUser allUser={allUser} />
      </main>
      </div>
  )
}

// export default withAuth(Page,"Adm"); 
export default withAuth(Page,"platform-operator");