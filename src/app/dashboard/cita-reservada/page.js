"use client"
import withAuth from '@/auth/withAuth'
import Movil from '@/components/header/Movil'
import TablesCita from '@/dashboard/components/tableUser/TableCitas'
import TableUser from '@/dashboard/components/tableUser/TableUser'
import dataApi from '@/data/fetchData'
import { useProduct } from '@/provider/ProviderContext'
import React, { useEffect, useState } from 'react'

const Page = () => {
   const [allCita,setAllCita] = useState([])
   const [refresh,setRefresh] = useState(false)
   const {user} = useProduct()
   useEffect(()=>{
    const getCita = async ()=>{
        const res = await dataApi.getAllCitaReserv(user.token);
        setAllCita(res)
    }
    getCita()
   },[user.token,refresh])
  
  return (
    <div className="">
      {<Movil role={"super user"} />}
      <main className="bg-white p-10">
        {<TablesCita allUser={allCita} setRefresh={setRefresh} refresh={refresh}/>  }
      </main>
      </div>
  )
}

export default withAuth(Page,"platform-operator");