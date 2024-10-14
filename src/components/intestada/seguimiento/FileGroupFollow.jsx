"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaCloudArrowUp, FaFilePdf } from "react-icons/fa6";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { ActionIcon, Button, FileInput, Pill } from "@mantine/core";
import dataApi from "@/data/fetchData";
import { useProduct } from "@/provider/ProviderContext";
import BtnObserv from "../buttons/BtnObserv";
import ModalView from "@/components/modalview/ModalView";
import FileSkeleton from "@/components/skeleton/FileSkeleton";
import { MdDeleteForever } from "react-icons/md";
import { notifications } from "@mantine/notifications";
import { PDFDocument } from "pdf-lib";
import usePdfValidator from "@/hook/usePdfValidator";
import Link from "next/link";

const FileGroupFollow = ({
  id,
  filesArray,
  status,
  view,
  errorSubasanar,
  setLoadingFile,
  files,
  setFiles,
  stateOk,
  setEstadoOk,
  statusComplete,
  filesMap,
  setFilesMap,
}) => {
  const { user } = useProduct();
  const { validatePdf, error } = usePdfValidator(10);
  const [pdfLink, setPdfLink] = useState(null);
  const url = "https://xynydxu4qi.us-east-2.awsapprunner.com/api/files/pdf";

  const ValueComponent = ({ value, onRemove }) => {
    if (value === null) {
      return null;
    }

    if (Array.isArray(value)) {
      return (
        <Pill.Group>
          {value.map((file, index) => (
            <div key={index} className="text-sm">
              {file.name}
              <ActionIcon
                onClick={(e) => {
                  e.stopPropagation(); // Evitar que se abra el selector

                  const updatedFiles = files[onRemove].filter(
                    (fileState) => fileState.name !== file.name
                  );

                  setEstadoOk({ ...stateOk, [onRemove]: false });
                  setFiles({ ...files, [onRemove]: updatedFiles });
                }}
                style={{ marginLeft: 8 }}
              >
                <MdDeleteForever />
              </ActionIcon>
            </div>
          ))}
        </Pill.Group>
      );
    }
  };

  const handleFileMultiple = (file, typeId, name) => {
    if (file) {
      setEstadoOk({ ...stateOk, [name]: false });
      if (!files || !Object.keys(files).length || files[name] == undefined) {
        setFiles({ ...files, [name]: [file], idFile: typeId });
      } else if (Object.keys(files)) {
        setFiles({ ...files, [name]: [...files[name], file], idFile: typeId });
      }
    }
  };

  const handleConverPostPdf = async (typeId, namePdf) => {
    setLoadingFile(true);
    if (files[namePdf].length === 0) return;

    const idFile = notifications.show({
      // id: typeId,
      autoClose: false,
      withCloseButton: true,
      title: "Espere subiendo archivo",
      message: namePdf,
      color: "red",
      icon: <FaFilePdf />,
      className: "my-notification-class",
      loading: true,
    });

    const mergedPdf = await PDFDocument.create();

    for (const file of files[namePdf]) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const fileConvert = new File([blob], `${namePdf}.pdf` || "merged.pdf", {
      type: "application/pdf",
    });

    if (fileConvert.type === "application/pdf" && validatePdf(fileConvert)) {
      try {
        const createFileNew = await dataApi.postFileOne(
          user.token,
          fileConvert,
          "",
          "seguimiento",
          typeId
        );
        //filesMap,
        setFilesMap([
          ...filesMap,
          { idFile: typeId, fileUrl: createFileNew.fileUrl },
        ]);
        if (createFileNew.fileUrl) {
          setPdfLink(createFileNew.fileUrl);
          setEstadoOk({ ...stateOk, [namePdf]: true });
        }
      } finally {
        setLoadingFile(false);
        notifications.update({
          id: idFile,
          withCloseButton: true,
          autoClose: 3000,
          title: "Archivo PDF subido",
          message: namePdf,
          color: "green",
          icon: <FaFilePdf />,
          className: "my-notification-class",
          // style: { backgroundColor: "greenyellow" },
          loading: false,
        });
      }
      return;
    }

    if (!validatePdf(fileConvert)) {
      setLoadingFile(false);
      notifications.update({
        id: idFile,
        withCloseButton: true,
        autoClose: 3000,
        title: "Archivo demasiado pesado",
        message: "pdf debe ser menos de 10MB",
        color: "red",
        icon: <FaFilePdf />,
        className: "my-notification-class",
        loading: false,
      });
    }
  };

  return (
    <>
      {" "}
      {(statusComplete?.status === "INCOMPLETO" ||
        statusComplete?.statusCode === 404 ||
        statusComplete?.status === "COMPLETO") && <p>No hay documentos</p>}
      {statusComplete?.status !== "INCOMPLETO" &&
        statusComplete?.status !== "COMPLETO" &&
        filesArray?.map((getfile) => (
          <div
            key={getfile.id}
            className="flex flex-col gap-4 items-center mb-2 lg:flex-row md:flex-row self-start"
          >
            <FileInput
              disabled={
                !(status == 1 && getfile.status == "OBSERVADO" && view == 2)
              }
              className="w-full"
              rightSection={
                <RiInboxUnarchiveFill size={20} style={{ color: "#82c91e" }} />
              }
              label={getfile.typeDocument.name}
              placeholder={"Selecciona tu archivo PDF haciendo clic aquí."}
              // leftSectionPointerEvents="none"
              value={files[getfile?.typeDocument.name] || null}
              error={
                (getfile.status === "OBSERVADO" || errorSubasanar) &&
                !(
                  status === 1 &&
                  getfile.status === "OBSERVADO" &&
                  view === 2
                ) ? (
                  <div>
                    1.- Tiene 48 horas para subsanar su documento.
                    <br />
                    2.- Volver a subir todo el documento completo con las
                    observaciones corregidas.
                  </div>
                ) : (
                  false
                )
              }
              onChange={(file) =>
                handleFileMultiple(file, getfile.id, getfile?.typeDocument.name)
              }
              valueComponent={({ value }) => (
                <ValueComponent
                  value={files[getfile.typeDocument.name] || null}
                  onRemove={getfile?.typeDocument.name}
                />
              )}
              accept="application/pdf"
            />
            <div
              className={`flex gap-4 ${
                getfile.status === "OBSERVADO" && status !== 1
                  ? "self-center"
                  : "self-end"
              }`}
            >
              <Link
                className={
                  getfile.status == "OBSERVADO" && !(view == 2)
                    ? "self-center"
                    : "self-end"
                }
                target="_blank"
                href={`${url}/${pdfLink || getfile.fileUrl}`}
              >
                <Button
                  variant="gradient"
                  gradient={{ from: "pink", to: "red", deg: 90 }}
                >
                  <FaFilePdf />
                </Button>
              </Link>{" "}
              {stateOk[getfile.typeDocument.name] &&
                getfile.status == "OBSERVADO" && (
                  <Button
                    className="self-end"
                    variant="gradient"
                    gradient={{ from: "lime", to: "green", deg: 90 }}
                  >
                    EXITOSO
                  </Button>
                )}
              {status == 1 &&
                getfile.status == "OBSERVADO" &&
                view == 2 &&
                !stateOk[getfile.typeDocument.name] && (
                  <Button
                    className="self-end"
                    disabled={
                      files[getfile?.typeDocument.name] === undefined ||
                      !files[getfile?.typeDocument.name].length
                        ? true
                        : false
                    }
                    onClick={() =>
                      handleConverPostPdf(getfile.id, getfile.typeDocument.name)
                    }
                    variant="gradient"
                    gradient={{ from: "blue", to: "violet", deg: 90 }}
                  >
                    ENVIAR DOCUMENTO
                  </Button>
                )}
              {getfile.status == "EN PROCESO" && (
                <Button className="self-end" color="indigo">
                  {getfile.status}
                </Button>
              )}
              {getfile.status == "OBSERVADO" && view !== 2 && (
                <Button
                  className={
                    getfile.status == "OBSERVADO" ? "self-center" : "self-end"
                  }
                  color="red"
                >
                  {getfile.status}
                </Button>
              )}
              {getfile.status == "VERIFICADO" && (
                <Button className="self-end" color="lime">
                  {getfile.status}
                </Button>
              )}
              {getfile.details && getfile.status == "OBSERVADO" && (
                <ModalView detalle={getfile.details} />
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default FileGroupFollow;
