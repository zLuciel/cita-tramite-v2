"use client";
import dataApi from "@/data/fetchData";
import React, { useEffect, useState } from "react";

const VisualCita = ({ id, token }) => {
  const [data, setData] = useState({});
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    const getCita = async () => {
      const res = await dataApi.verifyCita(token, id);

      setData(res.appointment);

      const date = new Date(res.appointment.appointmentDate);
      // Obtener día, mes y año
      const day = String(date.getUTCDate()).padStart(2, "0");
      const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Los meses son 0-indexed
      const year = date.getUTCFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      setFecha(formattedDate)
    };

    getCita();
  }, [id, token]);

  return (
    <div className="flex flex-col  gap-3">
      <h1 className="text-4xl font-bold">CONFIRMACIÓN DE CITA</h1>
      <h2 className="text-2xl">
        • Su cita fue programada para el día {fecha}, a horas{" "}
        {data?.schedule?.startTime}{" "}
      </h2>
      <div>
        <h3 className="text-2xl font-semibold">NOTA IMPORTANTE:</h3>
        <p className="text-2xl">
          - Presentarse a la CITA, el titular con su documento identidad.
        </p>
        <p className="text-2xl">
          - En caso de representante legal: Carta poder legalizada o vigencia de
          poder; según corresponda.
        </p>
      </div>
    </div>
  );
};

export default VisualCita;
