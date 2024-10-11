import dataApi from "@/data/fetchData";
import { useProduct } from "@/provider/ProviderContext";


import React from "react";

const CardTime = ({start,end,status,id,idSection}) => {
    const {user} = useProduct()
    
    const handleReserva = async (id,idSection)=>{
        const data = await dataApi.postCita(user.token,id,idSection)
        if(!data.isAvailable) window.open(`/confirmacion-de-cita?id=${idSection} `, "_blank");
         
    }

  return (
    <div  onClick={()=>handleReserva(id,idSection)} className={`${status == "ABIERTO" ? "greenyellow" : "redcolor"} px-4 py-4 rounded-lg flex flex-col gap-3 card-time`}>
      <span className="flex gap-4">
        <p>{start}</p>
        <p>{end}</p>
      </span>

      <p className="text-center">{status}</p>
    </div>
  );
};

export default CardTime;
