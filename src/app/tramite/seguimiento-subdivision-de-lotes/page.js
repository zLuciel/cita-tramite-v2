"use client";
import withAuth from "@/auth/withAuth";
import Header from "@/components/header/Header";

import { useProduct } from "@/provider/ProviderContext";
import { Button } from "@mantine/core";
import dataApi from "@/data/fetchData";
// import FileGroup from '@/components/intestada/seguimiento/FileGroup';
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Movil from "@/components/header/Movil";
import { useRouter, useSearchParams } from "next/navigation";
import FileGroupFollow from "@/components/intestada/seguimiento/FileGroupFollow";
import ButtonFollow from "@/components/buttons/ButtonFollow";
import Username from "@/components/username/Username";
// 0 en processo
// 1 SUBSANAR DOCUMENTOS
// 2 CONFIRMAR
// 3 SOLICITAR CITA verificados

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const { user } = useProduct();
  const [view, setView] = useState(0);
  const [filesArray, setFilesArray] = useState([]);
  const [validCita, setValidCita] = useState(false);
  const [mixto, setMixto] = useState(0);
  const [status, setStatus] = useState(0);
  const [refresh,setRefresh] = useState(false)
  const [loading,setLoading] = useState(true)
  const matches = useMediaQuery("(min-width: 1099px)");
  // fetch
  useEffect(() => {
    const fetchFile = async (id, token) => {
      try{
    
      const data = await dataApi.getFilesUser(id, token);
      const validCitaFetch = await dataApi.getValidCita(token, id);
      const veryReserva = await dataApi.verifyCita(token,id)
      setFilesArray(data);
      setValidCita(validCitaFetch)

      const hasObserved = data.some((doc) => doc.status == "OBSERVADO");
      const allInProcess = data.every((doc) => doc.status == "EN PROCESO");
      const allVerified = data.every((doc) => doc.status == "VERIFICADO");

      if (hasObserved) {
        setView(1);
        setMixto(2)
      } else if (allInProcess) {
        setView(0);
        setMixto(5)
      } else if (allVerified) {
        setView(3);
      } else {
        setView(2); // O cualquier otro valor que necesites para casos mixtos
        setMixto(6)
      }
      if(veryReserva.ok) setView(4)
      }  finally {
        setLoading(false);
      }
    };
    fetchFile(id, user.token);
  }, [id, user.token,refresh]);

  const handleSubsanar = () => {
    setStatus(1);
    setView(2);
    setMixto(1)
  };

  const handleCita = (id) => {
    router.push(`/tramite/cita?id=${id}`);
  };
  
  const handleViewCita = (id)=>{
    router.push(`/tramite/cita?id=${id}`);
  }

  return (
    <>
      <div className="body-grid">
        {!matches && <Movil Followid={id} />}
        {matches && <Header Followid={id} />}
        <main className="bg-white">
        {matches && <Username firstName={user.firstName} lastName={user.lastName} />}
          <div className="px-10 py-4">
          {(view == 0 || view == 3) && (
            <h1 className="text-2xl font-bold mb-4">SEGUIMIENTO DE TRÁMITE</h1>
          )}
          {(view == 1 || view == 2) && (
            <h1 className="text-2xl font-bold mb-4">
              SUBSANACIÓN DE DOCUMENTOS
            </h1>
          )}
          <FileGroupFollow
          loading={loading}
            setView={setView}
            id={id}
            filesArray={filesArray}
            status={status}
            view={view}
          />
          <div className="flex justify-center mt-4">
            {(view == 1 || mixto == 2 ) && (
              <Button
                onClick={handleSubsanar}
                className="self-end"
                color="indigo"
              >
                SUBSANAR DOCUMENTOS
              </Button>
            )}
           {view == 2 && mixto !== 6 && (
              <ButtonFollow
                color="indigo"
                text={"CONFIRMAR"}
                handleFunction={() => setRefresh(true)}
              />
            )}
            {(view == 3 && validCita.ok) && (
              <Button
                onClick={() => handleCita(id)}
                className="self-end"
                color="indigo"
              >
                SOLICITAR CITA
              </Button>
            )}
            {(view == 4 && mixto == 0) && (
              <Button
                onClick={() => handleViewCita(id)}
                className="self-end"
                color="indigo"
              >
                VER CITA
              </Button>
            )}
          </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default withAuth(Page,"user");
