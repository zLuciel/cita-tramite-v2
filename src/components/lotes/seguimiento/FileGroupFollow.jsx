"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaCloudArrowUp } from "react-icons/fa6";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { Button, FileInput } from "@mantine/core";
import dataApi from "@/data/fetchData";
import { useProduct } from "@/provider/ProviderContext";
import BtnObserv from "@/components/intestada/buttons/BtnObserv";
import { FaFilePdf } from "react-icons/fa";
import { notifications } from "@mantine/notifications";
import ModalView from "@/components/modalview/ModalView";

const FileGroupFollow = ({ setView, id, filesArray, status, view }) => {
  const { user } = useProduct();
  // const [filesArray, setFilesArray] = useState([]);

  
  const stateFileOne = filesArray[0]?.status;
  const stateFileTwo = filesArray[1]?.status;
  const stateFileTree = filesArray[2]?.status;
 

  const openRef = useRef(null);
  const [stateFile, setStateFile] = useState({
    documenOne: null,
    documentTwo: null,
  });

  const handleFileChange = async (file, key, id) => {
    //validar que los archivos esten llenos
    setStateFile((prevState) => ({
      ...prevState,
      [key]: file,
    }));

    if (file.type === "application/pdf") {
      const res = await dataApi.updateFile(user.token, file, id);
      if (res.fileUrl) {
        notifications.show({
          id: typeId,
          withCloseButton: true,
          autoClose: 3000,
          title: "Archivo PDF subido",
          message: "",
          color: "black",
          icon: <FaFilePdf />,
          className: "my-notification-class",
          style: { backgroundColor: "greenyellow" },
          loading: false,
        });
      }
      //stados numericos
      //1 completado pdf
      //2 no completado
      //3 observador
      //4 confirmado
      //5 en proceso
    }
  };
  //disabled
  return (
    <>
      {" "}
      <div className="flex gap-4 items-center">
        <FileInput
          disabled
          openRef={openRef}
          className="w-full"
          leftSection={<RiInboxUnarchiveFill />}
          label="Copia literal o partida electrónica todos los asientos"
          placeholder="Copia literal o partida electrónica todos los asientos"
          leftSectionPointerEvents="none"
          onChange={(file) =>
            handleFileChange(file, "documenOne", filesArray[0].id)
          }
          accept="application/pdf"
        />
        {status == 1 && stateFileOne == "OBSERVADO" && view == 2 && (
          <BtnObserv
            idFile={filesArray[0].id}
            stateFile={stateFile}
            setStateFile={setStateFile}
          />
        )}
        {stateFileOne == "EN PROCESO" && (
          <Button className="self-end" color="indigo">
            {stateFileOne}
          </Button>
        )}
        {stateFileOne == "OBSERVADO" && view !== 2 && (
          <Button className="self-end" color="red">
            {stateFileOne}
          </Button>
        )}
        {stateFileOne == "VERIFICADO" && (
          <Button className="self-end" color="lime">
            {stateFileOne}
          </Button>
        )}
        {(filesArray[0]?.details && stateFileOne == "OBSERVADO") && <ModalView detalle={filesArray[0]?.details } />}
      </div>
      <div className="flex gap-4 items-center">
        <FileInput
          disabled
          className="w-full"
          leftSection={<RiInboxUnarchiveFill />}
          label="Copia literal de las unidades subdivididas o membretadas"
          placeholder="Copia literal de las unidades subdivididas o membretadas"
          leftSectionPointerEvents="none"
          accept="application/pdf"
          onChange={(file) =>
            handleFileChange(file, "documentTwo", filesArray[1].id)
          }
        />
        {status == 1 && stateFileTwo == "OBSERVADO" && view == 2 && (
          <BtnObserv
            idFile={filesArray[1].id}
            stateFile={stateFile}
            setStateFile={setStateFile}
          />
        )}
        {stateFileTwo == "EN PROCESO" && (
          <Button className="self-end" color="indigo">
            {stateFileTwo}
          </Button>
        )}
        {stateFileTwo == "OBSERVADO" && view !== 2 && (
          <Button className="self-end" color="red">
            {stateFileTwo}
          </Button>
        )}
        {stateFileTwo == "VERIFICADO" && (
          <Button className="self-end" color="lime">
            {stateFileTwo}
          </Button>
        )}
        {(filesArray[1]?.details && stateFileTwo == "OBSERVADO") && <ModalView detalle={filesArray[1]?.details } />}
      </div>
      {/* tercero */}
      <div className="flex gap-4 items-center">
        <FileInput
          disabled
          className="w-full"
          leftSection={<RiInboxUnarchiveFill />}
          label="DNI de los herederos"
          placeholder="DNI de los herederos"
          leftSectionPointerEvents="none"
          accept="application/pdf"
          onChange={(file) =>
            handleFileChange(file, "documentTwo", filesArray[2].id)
          }
        />
        {status == 1 && stateFileTree == "OBSERVADO" && view == 2 && (
          <BtnObserv
            idFile={filesArray[2].id}
            stateFile={stateFile}
            setStateFile={setStateFile}
          />
        )}
        {stateFileTree == "EN PROCESO" && (
          <Button className="self-end" color="indigo">
            {stateFileTree}
          </Button>
        )}
        {stateFileTree == "OBSERVADO" && view !== 2 && (
          <Button className="self-end" color="red">
            {stateFileTree}
          </Button>
        )}
        {stateFileTree == "VERIFICADO" && (
          <Button className="self-end" color="lime">
            {stateFileTree}
          </Button>
        )}
        {(filesArray[2]?.details && stateFileTree == "OBSERVADO") && <ModalView detalle={filesArray[2]?.details } />}
      </div>
    </>
  );
};

export default FileGroupFollow;
