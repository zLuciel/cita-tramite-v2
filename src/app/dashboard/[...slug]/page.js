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
import ModalCita from "@/dashboard/components/modal/ModalCita";
import LoadingSJL from "@/components/loading/LoadingSJL";
import MessageDocument from "@/components/mensajes/MessageDocument";

const Page = ({ params }) => {
  const { user, documentUser, setDocumentUser } = useProduct();
  const [refresh, setRefresh] = useState(true);
  const [verified, setVerified] = useState(true);
  const [verifyCita, setVerifyCita] = useState(false);
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

  const handleSkipUser = () => {
    setRefresh(false)
    setDocumentUser([]);
    router.back();
  };

 
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
                  DOCUMENTOS{" "}
                  {documentUser[0]?.section.sectionName}
                </h1>
                <span className="flex gap-2">
                  <h3 className="uppercasse font-bold text-[blue] ">
                    Nombre de usuario:
                  </h3>
                  <p className="font-semibold uppercase">
                    {documentUser[0]?.user.firstName}{" "}
                    {documentUser[0]?.user.lastName}
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
                // sectionName={data.sectionName}
                // documents={data.documents}
                token={user.token}
              />
              {!citaQuery && (
                <div className="mt-4 flex gap-3 items-center justify-center">
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
