import React from "react";
import Image from "next/image";
import sjl from "@/assets/sjl.png";
import { Button } from "@mantine/core";
import dataApi from "@/data/fetchData";
import { notifications } from "@mantine/notifications";
import CardSkeletonCita from "../skeleton/CardSkeletonCita";
import { useRouter } from "next/navigation";
const CardCita = ({ citaUser, token, idSection, loading, setRefresh }) => {
  const router = useRouter();
  const time = citaUser.appointment?.appointmentDate;
  let startTime;
  let endTime;
  let day, month, year;
  if (time) {
    const [datePart] = time.split("T");
    [year, month, day] = datePart.split("-");
    startTime = citaUser.appointment?.schedule.startTime.slice(0, -3); // Quita los últimos 3 caracteres
    endTime = citaUser.appointment?.schedule.endTime.slice(0, -3);
  }
  const handleReprogramar = async () => {
    const reprogramar = await dataApi.deleteCita(token, idSection);

    if (reprogramar.ok) {
      notifications.show({
        id: idSection,
        withCloseButton: true,
        autoClose: 3000,
        title: reprogramar.msg,
        message: "",
        color: "green",
        // icon: <FaFilePdf />,
        className: "my-notification-class",
        loading: false,
      });
      setRefresh(true);
    }
    if (reprogramar.error) {
      notifications.show({
        id: idSection,
        withCloseButton: true,
        autoClose: 4500,
        title: "TEN ENCUENTA",
        message: reprogramar.message,
        color: "red",
        // icon: <FaFilePdf />,
        className: "my-notification-class",
        loading: false,
      });
    }
  };

  // if (loading) {
  //   return <CardSkeletonCita />;
  // }

  return (
    <div className="container-card px-8 py-6 flex flex-col justify-center items-center ">
      <>
        <Image
          style={{ borderRadius: "500px" }}
          src={sjl}
          width={80}
          alt="San juan de lurigancho logo"
        />
        <h3 className="text-1xl font-semibold uppercase mt-1">
          {citaUser.msg}{" "}
        </h3>
        <div className="flex gap-8 mb-5">
          <span className="flex flex-col gap-1 text-center mt-3">
            <p className="font-semibold">FECHA</p>
            <p>
              {day}-{month}-{year}{" "}
            </p>
          </span>
          <span className="flex flex-col gap-1 text-center mt-3">
            <p className="font-semibold">HORA</p>
            <p>
              {startTime}-{endTime}{" "}
            </p>
          </span>
        </div>
        <Button
          onClick={handleReprogramar}
          className="uppercase"
          variant="gradient"
          gradient={{ from: "red", to: "red", deg: 90 }}
        >
          reprogramar cita
        </Button>
      </>
    </div>
  );
};

export default CardCita;
