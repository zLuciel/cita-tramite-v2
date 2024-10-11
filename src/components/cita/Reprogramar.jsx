"use client";
import { useProduct } from "@/provider/ProviderContext";
import React, { useEffect, useState } from "react";
import { Button, Select } from "@mantine/core";
import dataApi from "@/data/fetchData";
import { RxCountdownTimer } from "react-icons/rx";

import "@mantine/dates/styles.css";
import Calendary from "@/components/Calendary/Calendary";
import { notifications } from "@mantine/notifications";
import { RiTimeFill } from "react-icons/ri";

const Reprogramar = ({
  id,
  idUserParams,
  setVerifyCita,
  close,
  reprogramar,
}) => {
  const { user } = useProduct();
  const [memoryTime, setMemoryTime] = useState([]);
  const [dataTime, setDataTime] = useState([]);
  const [dataSuperName, setDataSuperName] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [idSuper, setIdSuper] = useState(null);
  const [idTime, setIdTime] = useState(null);
  const [disable, setDisable] = useState(true);
  const [citaUser, setCitaUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [view, setView] = useState(false);

  useEffect(() => {
    const getAdmi = async () => {
      try {
        const resSuper = await dataApi.getSuperUser(user.token);
        const resHorario = await dataApi.getTimeCita(user.token);
        const verifyCita = await dataApi.verifyCita(user.token, id);
        let nameSuperArray = [];
        let horarioArray = [];

        resSuper.forEach((adm) => {
          nameSuperArray.push({
            value: adm.id,
            label: `${adm.firstName} ${adm.lastName}`,
          });
        });
        resHorario.forEach((time) => {
          horarioArray.push({
            value: time.id,
            label: `${time.startTime} ${time.endTime}`,
          });
        });

        setDataSuperName(nameSuperArray);
        // setDataTime(horarioArray);
        setMemoryTime(horarioArray);
        setCitaUser(verifyCita);
      } finally {
        setLoading(false);
      }
    };

    getAdmi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token, refresh]);

  useEffect(() => {
    const timeAvilid = async () => {
      setDisable(true);

      if (user.id && selectedDate) {
        notifications.show({
          id: 50,
          withCloseButton: true,
          autoClose: false,
          title: "Obteniendo horario..",
          message: "",
          color: "green",
          icon: <RiTimeFill />,
          className: "my-notification-class",
          loading: true,
        });
        try {
          const getTimes = await dataApi.getSuperTime(
            user.token,
            user.id,
            selectedDate
          );

          // Obtener todos los IDs de horarios
          const idsToDisable = getTimes.map((item) => item.schedule.id);

          // Actualizar el estado de dataTime usando el estado anterior
          const newDataTime = memoryTime.map((item) => ({
            ...item,
            disabled: idsToDisable.includes(item.value)
              ? true
              : item.disabled || false,
          }));

          setDataTime(newDataTime);
        } finally {
          notifications.update({
            id: 50,
            withCloseButton: true,
            autoClose: 3000,
            title: "Horario cargado exitoso",
            message: "Nota: Primero seleccione la fecha luego la hora",
            color: "green",
            icon: <RiTimeFill />,
            className: "my-notification-class",
            loading: false,
          });
          setDisable(false);
        }

        // setSelectedDate(null);
      }
    };

    timeAvilid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idSuper, selectedDate, user.token]);

  const handleCreateCita = async () => {
    const res = await dataApi.getCreateCita(
      user.token,
      id,
      idTime,
      idUserParams,
      selectedDate,
      reprogramar
    );

    const verifyCita = await dataApi.verifyCita(user.token, id);

    setCitaUser(verifyCita);

    if (res.status === "PENDING") {
      // setVerifyCita(res.reservedBy.isActive);
      // setViewVerty(true)
      notifications.show({
        id: id,
        withCloseButton: true,
        autoClose: 3000,
        title: "Cita creada exitosa",
        message: "",
        color: "green",
        // icon: <FaFilePdf />,
        className: "my-notification-class",
        loading: false,
      });
      close();
    }
    if (res.ok) {
      // setViewVerty(true)
      notifications.show({
        id: id,
        withCloseButton: true,
        autoClose: 3000,
        title: "Ya tiene una cita pediente",
        message: "",
        color: "red",
        // icon: <FaFilePdf />,
        className: "my-notification-class",
        loading: false,
      });
      close();
    }
  };
  const handleDeleteCita = async () => {
    notifications.show({
      id: id,
      withCloseButton: true,
      autoClose: false,
      title: "Validando reprogramación de cita...",
      message: "",
      color: "green",
      // icon: <FaFilePdf />,
      className: "my-notification-class",
      loading: false,
    });
    const reprogramar = await dataApi.deleteCita(user.token, id, idUserParams);

    if (reprogramar.ok) {
      notifications.update({
        id: id,
        withCloseButton: true,
        autoClose: 3000,
        title: reprogramar.msg,
        message: "",
        color: "green",
        // icon: <FaFilePdf />,
        className: "my-notification-class",
        loading: false,
      });
      setView(true);
    }
    if (reprogramar.error) {
      notifications.update({
        id: id,
        withCloseButton: true,
        autoClose: 3400,
        title: "TEN ENCUENTA",
        message: reprogramar.message,
        color: "red",
        // icon: <FaFilePdf />,
        className: "my-notification-class",
        loading: false,
      });
    }
  };

  return (
    <>
      {view && (
        <section className="bg-white">
          <div className="px-10 py-4">
            <h3 className="text-2xl font-bold uppercase">
              Solo puede seleccionar los días sábados.
            </h3>
            {/* <p>Solo puede seleccionar los días sábados.</p> */}
            <div className="mt-4">
              <div className="">
                <div className="w-full mb-4 ">
                  <Select
                    label="Seleccione un horario"
                    placeholder="click aquí elige horario"
                    data={dataTime}
                    value={idTime}
                    onChange={setIdTime}
                  />
                </div>
                <Calendary
                  setIdTime={setIdTime}
                  setDataTime={setDataTime}
                  memoryTime={memoryTime}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
                <div className="mt-3 w-full">
                  <Button
                    fullWidth
                    variant="filled"
                    color="green"
                    onClick={handleCreateCita}
                  >
                    ENVIAR CITA
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {!view && (
        <Button
          onClick={() => handleDeleteCita()}
          justify="center"
          fullWidth
          rightSection={<RxCountdownTimer />}
          variant="gradient"
          gradient={{ from: "red", to: "pink", deg: 90 }}
        >
          CLICK AQUI REPROGRAMAR CITA
        </Button>
      )}
    </>
  );
};

export default Reprogramar;
