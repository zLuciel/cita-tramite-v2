"use client";
import React from "react";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { FileInput, Pill, ActionIcon } from "@mantine/core";
import { MdDeleteForever } from "react-icons/md";

import ButtonUpdate from "./ButtonUpdate";
import { FaFilePdf } from "react-icons/fa6";
import { notifications } from "@mantine/notifications";

const FileGroup = ({
  dataDocument,
  files,
  setFiles,
  stateOk,
  setEstadoOk,
  // loadingFile,
  setLoadingFile,
  idDocument,
  completFileInput,
  setCompletFileInput,
  // update,
  // setUpdate,
  memoryProcess,
  setMemoryProcess,
}) => {
  //onremove es el name del file
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
                  if (updatedFiles.length === 0) {
                    setCompletFileInput(memoryProcess);
                  }
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

  const handleFileMultiple = (file, typeId, name, idFile) => {
    if (file.type !== "application/pdf") {
      notifications.show({
        id: 10,
        withCloseButton: true,
        autoClose: 3000,
        title: "Solo archivo PDF",
        message: "",
        color: "red",
        icon: <FaFilePdf />,
        className: "my-notification-class",
        loading: false,
      });
      return;
    }

    setEstadoOk({ ...stateOk, [name]: false });
    if (file) {
      const updatedArray = completFileInput.map((file) =>
        file.typeDocument?.id == idFile ? {} : file
      );
      setCompletFileInput(updatedArray);
      if (!Object.keys(files).length || files[name] == undefined) {
        setFiles({ ...files, [name]: [file] });
      } else if (Object.keys(files)) {
        setFiles({ ...files, [name]: [...files[name], file] });
      }
    }
  };

  return (
    <>
      {dataDocument?.typedocument.map((getfiles) => {
        const matchingFile = completFileInput?.find(
          (file) => file.typeDocument?.id === getfiles.id
        );
        const updateVery = memoryProcess?.find(
          (file) => file.typeDocument?.id === getfiles.id
        );
        return (
          <>
            <div
              key={getfiles.id}
              className="flex flex-col lg:flex-row md:flex-row sm:flex-row gap-4  items-center mb-5"
            >
              <FileInput
                size="md"
                className="w-full"
                rightSection={
                  <RiInboxUnarchiveFill
                    size={20}
                    style={{ color: "#82c91e" }}
                  />
                }
                label={getfiles.name}
                placeholder={"Selecciona tu archivo PDF haciendo clic aquí."}
                value={files[getfiles.name]}
                leftSectionPointerEvents="none"
                onChange={(file) =>
                  handleFileMultiple(
                    file,
                    getfiles.sectionTypeId,
                    getfiles.name,
                    getfiles.id
                  )
                }
                valueComponent={({ value }) => (
                  <ValueComponent
                    value={files[getfiles.name]}
                    onRemove={getfiles.name}
                  />
                )}
                accept="application/pdf,.pdf"
              />

              <ButtonUpdate
                updateVery={updateVery}
                setMemoryProcess={setMemoryProcess}
                setCompletFileInput={setCompletFileInput}
                idDocument={idDocument}
                stateOk={stateOk}
                setEstadoOk={setEstadoOk}
                setLoadingFile={setLoadingFile}
                files={files}
                sectionIdDocument={dataDocument.sectionId}
                matchingFile={matchingFile}
                fileName={files[getfiles.name]}
                idFiles={getfiles.id}
                getfileName={getfiles.name}
              />
            </div>
          </>
        );
      })}
    </>
  );
};

export default FileGroup;
