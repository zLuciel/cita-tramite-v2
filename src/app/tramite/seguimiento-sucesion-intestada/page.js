"use client";
import withAuth from "@/auth/withAuth";
import Header from "@/components/header/Header";

import { useProduct } from "@/provider/ProviderContext";
import { Button } from "@mantine/core";
import dataApi from "@/data/fetchData";
// import FileGroup from '@/components/intestada/seguimiento/FileGroup';
import React, { useEffect, useState } from "react";
import Movil from "@/components/header/Movil";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import FileGroupFollow from "@/components/intestada/seguimiento/FileGroupFollow";
import ButtonFollow from "@/components/buttons/ButtonFollow";
import Username from "@/components/username/Username";
import LodingFile from "@/components/loading/LodingFile";
import CountdownTwoWeeks from "@/components/cita/CountdownTwoWeeks";
import ReprogramarMessage from "@/components/cita/ReprogramarMessage";

// 0 en processo
// 1 SUBSANAR DOCUMENTOS
// 2 CONFIRMAR
// 3 SOLICITAR CITA verificados

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const { user } = useProduct();
  const [view, setView] = useState(0);
  const [mixto, setMixto] = useState(0);
  const [filesArray, setFilesArray] = useState([]);
  const [validCita, setValidCita] = useState([]);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [files, setFiles] = useState({}); // era objeto
  const matches = useMediaQuery("(min-width: 1099px)");
  const [loadingFile, setLoadingFile] = useState(false);
  const [idVeryCite, setVeryCiteid] = useState({
    id: null,
    message: null,
  });
  const [stateOk, setEstadoOk] = useState({});
  const [statusComplete, setStatusComplete] = useState({});
  const allTrue =
    Object.keys(stateOk).length > 0 &&
    Object.values(stateOk).every((value) => value === true);
  // fetch
  useEffect(() => {
    setLoadingFile(true);
    const fetchFile = async (id, token) => {
      try {
        const resVeryStatus = await dataApi.getProcessFile(token, id);
        setStatusComplete(resVeryStatus);
        const data = await dataApi.getFilesUser(id, token);
        setFilesArray(data);
        const validCitaFetch = await dataApi.getValidCita(token, id);
        const veryReserva = await dataApi.verifyCita(token, id);
       
        
        setValidCita(validCitaFetch);
        if (
          statusComplete?.status === "INCOMPLETO" ||
          statusComplete?.statusCode === 404
        )
          return;

        const hasObserved = data.some((doc) => doc.status == "OBSERVADO");
        const allInProcess = data.every((doc) => doc.status == "EN PROCESO");
        const allVerified = data.every((doc) => doc.status == "VERIFICADO");

        if (hasObserved) {
          setView(1);
          setMixto(2);
        } else if (allInProcess) {
          setView(0);
          setMixto(5);
        } else if (allVerified) {
          setView(3);
        } else {
          setView(2); // O cualquier otro valor que necesites para casos mixtos
          setMixto(6);
        }

        if (veryReserva.ok) {
          setVeryCiteid({
            idcita: veryReserva.appointment.id,
            message: veryReserva.appointment.message,
          });
          setView(4);
        }
      } finally {
        setLoading(false);
        setLoadingFile(false);
      }
    };
    fetchFile(id, user.token);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, refresh]);

  const handleSubsanar = () => {
    setStatus(1);
    setView(2);
    setMixto(1);
  };

  const handleViewCita = (id) => {
    window.open(`/confirmacion-de-cita?id=${id}`, "_blank");
  };

  const handleRefresh = () => {
    setFiles({});
    setRefresh(!refresh);
  };

  const handleCita = (id) => {
    router.push(`/tramite/cita?id=${id}`);
  };

  return (
    <>
      <div className="body-grid">
        {!matches && <Movil Followid={id} />}
        {matches && <Header Followid={id} />}
        <main className="bg-white relative">
          {loadingFile && <LodingFile />}

          {matches && (
            <Username firstName={user.firstName} paterno={user.apellido_paterno} materno={user.apellido_materno} />
          )}
          <div className="px-10 py-4">
            {validCita?.processStatus?.status === "VERIFICADO" &&
              validCita?.processStatus?.status !== "CITA_PROGRAMADA" && (
                <CountdownTwoWeeks
                  startDate={validCita?.processStatus?.updatedAt}
                />
              )}
            {(view == 0 || view == 3) && (
              <h1 className="text-2xl font-bold mb-4">
                SEGUIMIENTO DE TRÁMITE
              </h1>
            )}
            {(view == 1 || view == 2) && (
              <h1 className="text-2xl font-bold mb-4">
                SUBSANACIÓN DE DOCUMENTOS
              </h1>
            )}
            <FileGroupFollow
              statusComplete={statusComplete}
              loadingFile={loadingFile}
              setLoadingFile={setLoadingFile}
              stateOk={stateOk}
              setEstadoOk={setEstadoOk}
              files={files}
              setFiles={setFiles}
              loading={loading}
              setView={setView}
              id={id}
              filesArray={filesArray}
              status={status}
              view={view}
            />
            <div className="flex justify-center mt-4">
              {(view == 1 || mixto == 2) && (
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
                  allTrue={allTrue}
                  confirmar={true}
                  color="indigo"
                  text={"CONFIRMAR"}
                  handleFunction={() => handleRefresh()}
                />
              )}
              <div className="flex gap-3">
                {view == 4 && mixto == 0 && (
                  <Button
                    onClick={() => handleViewCita(id)}
                    className="self-end"
                    color="indigo"
                  >
                    VER CITA
                  </Button>
                )}
                {validCita?.processStatus?.status === "CITA_PROGRAMADA" && (
                  <ReprogramarMessage
                    id={idVeryCite.idcita}
                    message={idVeryCite.message}
                    token={user.token}
                  />
                )}
              </div>
              {view == 3 &&
                validCita?.processStatus?.status === "VERIFICADO" && (
                  <ButtonFollow
                    handleFunction={() => handleCita(id)}
                    color="indigo"
                    text={"SOLICITAR CITA"}
                  />
                )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default withAuth(Page, "user");
