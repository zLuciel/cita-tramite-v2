"use client";
import withAuth from "@/auth/withAuth";
import Movil from "@/components/header/Movil";
import { useProduct } from "@/provider/ProviderContext";
import React from "react";

const Page = () => {
  const { user } = useProduct();

  return (
    <div className="">
      {<Movil role={"super user"} />}
      <main className="p-10 presentacion relative flex items-center">
        <div className="m-auto max-presentacion flex flex-col gap-5 justify-center items-center">
          <h1 className="text-5xl text-center text-white font-bold">
            GENERADOR DE CITAS (TRAMITES , DOCUMENTOS)
          </h1>
          <p className="text-center text-[#C4C4C4] ">
            Un Generador de Citas permite a los usuarios programar citas de
            manera eficiente para la realización de trámites o la presentación
            de documentos. Esta herramienta automatiza la asignación de fechas y
            horas disponibles, optimizando el proceso y asegurando una
            experiencia más organizada y rápida para la gestión de solicitudes.
          </p>
        </div>
      </main>
    </div>
  );
};

export default withAuth(Page, "platform-operator");
