"use client";
import withAuth from "@/auth/withAuth";
import Movil from "@/components/header/Movil";
import React, { useEffect, useState } from "react";
import IntestadaDocument from "@/dashboard/components/ficheros/IntestadaDocument";
import { useProduct } from "@/provider/ProviderContext";
import dataApi from "@/data/fetchData";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Tooltip } from "@mantine/core";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import LoadingSJL from "@/components/loading/LoadingSJL";
import MessageDocument from "@/components/mensajes/MessageDocument";
import { notifications } from "@mantine/notifications";

const Page = ({ params }) => {
  const { user, documentUser, setDocumentUser } = useProduct();
  const [refresh, setRefresh] = useState(true);
  const [verified, setVerified] = useState(true);
  const [ObserFile, setObserFile] = useState(false);
  const [userOne, setUserOne] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const idSection = params.slug[1];
  const nuevoQuery = searchParams.get("nuevo"); // nuevo pendiente o no pendiente
  const pendienteQuery = searchParams.get("pendiente");
  const noPendiente = searchParams.get("nopendiente");
  const idQueryPendiente = searchParams.get("iduser");
  const idCitapendi = searchParams.get("idCita");
  const citaPendiente = searchParams.get("citapendiente");
  const citaQuery = searchParams.get("cita");

  useEffect(() => {
    async function getDocumentUser() {
      try {
        let data;
        if (nuevoQuery) {
          const resOne = await dataApi.getUserOneCard(user.token, idSection);
          if (!resOne.length) return;
          data = await dataApi.getUserDocumentSection(
            user.token,
            idSection,
            resOne[0]?.user.id
          );
          setDocumentUser(data);
          setUserOne(resOne);
        } else if (pendienteQuery) {
          const resOne = await dataApi.getPedingOne(user.token, idSection);
          if (!resOne.length) return;
          data = await dataApi.getUserDocumentSection(
            user.token,
            idSection,
            resOne[0]?.user.id
          );
          setDocumentUser(data);
          setUserOne(resOne);
        }
        if (citaPendiente) {
          data = await dataApi.getUserDocumentSection(
            user.token,
            idSection,
            idQueryPendiente
          );
          setDocumentUser(data);
        }
        if (noPendiente && idQueryPendiente) {
          data = await dataApi.getUserDocumentSection(
            user.token,
            idSection,
            idQueryPendiente
          );
          setDocumentUser(data);
        }
        if (idCitapendi) {
          data = await dataApi.getUserDocumentSection(
            user.token,
            idSection,
            idCitapendi
          );
          setDocumentUser(data);
        }
        const allVerified = data.every((doc) => doc.status == "VERIFICADO");

        setVerified(allVerified);
      } finally {
        setLoading(false);
      }
    }

    if (user.token) getDocumentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idSection, params, setDocumentUser, user.token]);

  if (loading) {
    return <LoadingSJL />;
  }

  const handleSkipUser = async () => {
    notifications.show({
      id: 1,
      withCloseButton: true,
      autoClose: false,
      title: "Enviando correo...",
      message: "",
      color: "green",
      className: "my-notification-class",
      loading: true,
    });
    let message = false;
    if (verified) {
      const emailSendVery = await dataApi.sendVeryDocument(
        user.token,
        userOne[0].user.email
      );
      message = emailSendVery.message;
    } else if (ObserFile) {
      const emailSendObser = await dataApi.sendObserDocument(
        user.token,
        userOne[0].user.email
      );
      message = emailSendObser.message;
    }
    if (message) {
      notifications.update({
        id: 1,
        withCloseButton: true,
        autoClose: 3000,
        title: message,
        message: "",
        color: "green",
        className: "my-notification-class",
        loading: false,
      });
    }

    setRefresh(false);
    setDocumentUser([]);
    router.back();
  };
  console.log(userOne, 1444);

  return (
    <>
      <div className="">
        {<Movil role={"super user"} />}
        <main className="cal-header-main bg-white p-10 flex flex-col gap-4">
          {!userOne.length && !documentUser.length && <MessageDocument />}
          {(userOne.length || documentUser.length) && (
            <div>
              <div className="mb-4">
                <h1 className="text-2xl font-bold mb-3">
                  DOCUMENTOS {documentUser[0]?.section.sectionName}
                </h1>
                <span className="flex gap-2">
                  <h3 className="uppercasse font-bold text-[blue] ">
                    Nombre de usuario:
                  </h3>
                  <p className="font-semibold uppercase">
                    {documentUser[0]?.user.firstName}{" "}
                    {documentUser[0]?.user.apellido_paterno}{" "}
                    {documentUser[0]?.user.apellido_materno}
                  </p>
                </span>
              </div>
              <IntestadaDocument
                setRefresh={setRefresh}
                paramsID={
                  idCitapendi
                    ? idCitapendi
                    : documentUser[0]?.user.id || userOne
                } //revisa aqui
                documentUser={documentUser}
                idSection={idSection}
                setVerified={setVerified}
                setObserFile={setObserFile}
                token={user.token}
              />
              {!citaQuery && (
                <div className="mt-4 flex gap-3 items-center justify-center">
                  {!noPendiente && (
                    <Tooltip
                      label={
                        refresh
                          ? "Atienda primero a este cliente"
                          : "Ya puede ver el siguiente"
                      }
                    >
                      <Button
                        disabled={refresh}
                        onClick={handleSkipUser}
                        rightSection={
                          <FaPersonWalkingArrowRight
                            style={{ color: "white" }}
                            size={20}
                          />
                        }
                      >
                        SIGUIENTE ADMINISTRADO
                      </Button>
                    </Tooltip>
                  )}
                  {noPendiente && (
                    <Button
                      onClick={handleSkipUser}
                      rightSection={
                        <FaPersonWalkingArrowRight
                          style={{ color: "white" }}
                          size={20}
                        />
                      }
                    >
                      SIGUIENTE ADMINISTRADO
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default withAuth(Page, "platform-operator");
