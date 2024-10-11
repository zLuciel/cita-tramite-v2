"use client"
import withAuth from '@/auth/withAuth'
import Movil from '@/components/header/Movil'
import TableNoCita from '@/dashboard/components/tableUser/TableNoCita'
import dataApi from '@/data/fetchData'
import { useProduct } from '@/provider/ProviderContext'
import React, { useEffect, useState } from 'react'

const Page = () => {
   const [allCita,setAllCita] = useState([])
   const {user} = useProduct()
   useEffect(()=>{
    const getCita = async ()=>{
        const res = await dataApi. getAllPedingCita(user.token);
        setAllCita(res)
        console.log(res,1418);
        
    }
    getCita()
   },[user.token])

  return (
    <div className="">
      {<Movil role={"super user"} />}
      <main className="bg-white p-10">
        {<TableNoCita allUser={allCita} /> }
      </main>
      </div>
  )
}

export default withAuth(Page,"platform-operator");