"use client";
import dataApi from "@/data/fetchData";
import { Button, Input, Select, Switch } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { FaFilePdf } from "react-icons/fa6";
import ModalObservadoText from "../observado/ModalObservadoText";
import { useProduct } from "@/provider/ProviderContext";

const IntestadaDocument = ({
  documentUser,
  token,
  paramsID,
  idSection,
  email = false,
  setRefresh,
  setVerified,
}) => {
  const { setDocumentUser } = useProduct();
  const url = "https://xynydxu4qi.us-east-2.awsapprunner.com/api/files/pdf";

  const handleChange = async (id, value) => {
    
    const updateState = await dataApi.updateStatus(token, value, id);
    
    // await dataApi.getValidCita(token, dSection);
    const data = await dataApi.getUserDocumentSection(
      token,
      idSection,
      paramsID
    );

    const allInProcess = data.some((doc) => doc.status == "EN PROCESO");
    const allVerified = data.every((doc) => doc.status == "VERIFICADO");

    setDocumentUser(data);

    setVerified(allVerified);
    setRefresh(allInProcess);
  };

  return (
    <div className="flex flex-col gap-3">
      {documentUser?.map((getfile, index) => (
        <div key={index} className="flex flex-col gap-2 w-full">
          <h3 className="font-semibold">
            {getfile.typeDocument.name}
          </h3>
          <div className="flex gap-3 w-full">
            <Input
              className="w-full"
              disabled
              placeholder={getfile.typeDocument.name}
            />
            {!email && (
              <Select
                data={["EN PROCESO", "VERIFICADO", "OBSERVADO"]}
                value={getfile.status}
                allowDeselect={false}
                onChange={(value) => handleChange(getfile.id, value)} // Cambiado aquí
              />
            )}
            {email && (
              <Button
                variant="gradient"
                gradient={{ from: "lime", to: "green", deg: 90 }}
              >
                {getfile.status}
              </Button>
            )}
            <Link target="_blank" href={`${url}/${getfile.fileUrl}`}>
              <Button
                leftSection={<FaFilePdf size={14} />}
                variant="filled"
                color="red"
              >
                VER
              </Button>
            </Link>
            {getfile.status === "OBSERVADO" && (
              <ModalObservadoText id={getfile.id} token={token} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntestadaDocument;
