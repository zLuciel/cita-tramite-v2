"use client";
import withAuth from "@/auth/withAuth";
import Header from "@/components/header/Header";
import FileGroupFollow from "@/components/intestada/seguimiento/FileGroupFollow";
import { useProduct } from "@/provider/ProviderContext";
import { Button } from "@mantine/core";
import dataApi from "@/data/fetchData";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Movil from "@/components/header/Movil";
import { useMediaQuery } from "@mantine/hooks";
import ButtonFollow from "@/components/buttons/ButtonFollow";
import Username from "@/components/username/Username";
import LodingFile from "@/components/loading/LodingFile";
import CountdownTwoWeeks from "@/components/cita/CountdownTwoWeeks";
import ReprogramarMessage from "@/components/cita/ReprogramarMessage";

// 0 en processo
// 1 SUBSANAR DOCUMENTOS
// 2 CONFIRMAR
// 3 SOLICITAR CITA verificados
// 4 ya tiene cita ver su cita
const Page = () => {
  // const id = searchParams.id;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { user } = useProduct();
  const [view, setView] = useState(0);
  const [filesArray, setFilesArray] = useState([]);
  const [status, setStatus] = useState(0);
  const [mixto, setMixto] = useState(0);
  const [validCita, setValidCita] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingFile, setLoadingFile] = useState(false);
  const [errorSubasanar, setErrorSubasanar] = useState(false);
  const [stateOk, setEstadoOk] = useState({});
  const [files, setFiles] = useState({});
  const [statusComplete, setStatusComplete] = useState({});
  const allTrue =
    Object.keys(stateOk).length > 0 &&
    Object.values(stateOk).every((value) => value === true);
  const matches = useMediaQuery("(min-width: 1099px)");

  useEffect(() => {
    setLoadingFile(true);
    const fetchFile = async (id, token) => {
      try {
        const resVeryStatus = await dataApi.getProcessFile(token, id);

        setStatusComplete(resVeryStatus);
        const data = await dataApi.getFilesUser(id, token);
        console.log(data, 1111);

        setFilesArray(data);
        const validCitaFetch = await dataApi.getValidCita(token, id);
        console.log(validCitaFetch,4444);
        
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

        if (veryReserva.ok) setView(4);
      } finally {
        setLoading(false);
        setLoadingFile(false);
      }
    };
    fetchFile(id, user.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user.token, refresh]);

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

  return (
    <>
    
      <div className="body-grid">
        {!matches && <Movil Followid={id} />}
        {matches && <Header Followid={id} />}
        <main className="bg-white relative w-full">
          {loadingFile && <LodingFile seguimiento={true} />}
          {matches && (
            <Username firstName={user.firstName} lastName={user.lastName} />
          )}
          <div className="px-10 py-4">
            {validCita?.processStatus?.status === "VERIFICADO" && <CountdownTwoWeeks startDate={validCita?.processStatus?.updatedAt} />}
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
              refresh={refresh}
              setRefresh={setRefresh}
              errorSubasanar={errorSubasanar}
              loading={loading}
              setView={setView}
              id={id}
              filesArray={filesArray}
              status={status}
              view={view}
            />
            <div className="flex justify-center mt-4">
              {(view == 1 || mixto == 2) && (
                <ButtonFollow
                  handleFunction={() => handleSubsanar()}
                  color="indigo"
                  text={" SUBSANAR DOCUMENTOS"}
                />
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

              {view == 4 && mixto == 0 && (
                <ButtonFollow
                  handleFunction={() => handleViewCita(id)}
                  color="indigo"
                  text={"VER CITA"}
                />
              )}

              {view == 3 && validCita.ok && (
                <ButtonFollow
                  handleFunction={() => handleCita(id)}
                  color="indigo"
                  text={"SOLICITAR CITA"}
                />
              )}
              <ReprogramarMessage/>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default withAuth(Page, "user");
