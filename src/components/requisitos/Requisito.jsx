"use client";
import { List } from "@mantine/core";
import React, { useEffect, useState } from "react";

import { Stepper, Button, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import FileGroup from "../intestada/FileGroup";
import LinkFollow from "../linkfollow/LinkFollow";
import dataApi from "@/data/fetchData";
import { useProduct } from "@/provider/ProviderContext";
import LodingFile from "../loading/LodingFile";

const Requisito = ({ dataDocument, inestadaReq }) => {
  const idDocument = dataDocument?.sectionId;
  const { user } = useProduct();
  const [active, setActive] = useState(0);
  const [stateOk, setEstadoOk] = useState({});
  const [files, setFiles] = useState({}); // era objeto
  const countFile = dataDocument?.typedocument.length;
  const matches = useMediaQuery("(min-width: 700px)");
  const [loadingFile, setLoadingFile] = useState(false);
  const [completFileInput, setCompletFileInput] = useState([]);
  const [memoryProcess, setMemoryProcess] = useState([]);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const verifyFileUser = async () => {
      const res = await dataApi.getProcessFile(user.token, idDocument);
      const CompletFileInput = await dataApi.getCompletFilesInputs(
        user.token,
        idDocument
      );
      console.log(res, "viendo error");

      setCompletFileInput(CompletFileInput);
      setMemoryProcess(CompletFileInput);

      if (
        res?.status !== "INCOMPLETO" &&
        (!res?.statusCode || res.statusCode !== 404) &&
        res.statusCode !== 500
      ) {
        setActive(3);
      }
    };
    verifyFileUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countFile, idDocument]);

  const nextStep = () => {
    //asegurate que llene el formulario
    if (active == 1) {
      setActive(3);
      return;
    }
    setActive((current) => (current < 3 ? current + 1 : current));
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <div className="p-10 py-4">
      {loadingFile && <LodingFile />}
      <Stepper
        active={active}
        orientation={!matches ? "vertical" : "horizontal"}
      >
        <Stepper.Step label="REQUISITOS" description="Lea los requisitos">
          <List type="ordered">
            {dataDocument?.typedocument.map((require, index) => (
              <List.Item key={require.id}>
                {++index}.- {require.name}
              </List.Item>
            ))}{" "}
            <br />
            {inestadaReq && (
              <div className="text-sm flex flex-col gap-2">
                <p>* TODO DOCUMENTO DE SUNARP TIENE UNA VIGENCIA DE 3 MESES.</p>
                <p>
                  * SI LA CONDICION DE LA PROPIEDAD ES {`"POSESIONARIO"`} NO SE
                  PODRA <br />
                  REALIZAR LA INSCRIPCION DE LA SUCESION INTESTADA.
                </p>
              </div>
            )}
          </List>
        </Stepper.Step>
        <Stepper.Step label="CARGA DOCUMENTOS" description="solo archivos PDF">
          <div className="relative flex flex-col gap-3">
            <FileGroup
              setMemoryProcess={setMemoryProcess}
              memoryProcess={memoryProcess}
              setCompletFileInput={setCompletFileInput}
              update={update}
              setUpdate={setUpdate}
              completFileInput={completFileInput}
              idDocument={idDocument}
              setLoadingFile={setLoadingFile}
              loadingFile={loadingFile}
              dataDocument={dataDocument}
              files={files}
              setFiles={setFiles}
              stateOk={stateOk}
              setEstadoOk={setEstadoOk}
            />
          </div>
        </Stepper.Step>
        <Stepper.Step
          label="PROCESO COMPLETADO"
          description="Archivos completados"
        ></Stepper.Step>
        <Stepper.Completed
          label="PROCESO COMPLETADO"
          description="Archivos completados"
        >
          <LinkFollow
            idDocument={idDocument}
            sectionSlug={dataDocument?.sectionSlug}
          />
        </Stepper.Completed>
      </Stepper>

      {active !== 3 && (
        <Group justify="center" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Atras
            </Button>
          )}

          <Button
            disabled={active === 1 && !(completFileInput.length === countFile)}
            onClick={nextStep}
          >
            {active == 0 ? "INICIAR TRAMITE" : "INICIAR TRAMITE"}
          </Button>
        </Group>
      )}
    </div>
  );
};

export default Requisito;
