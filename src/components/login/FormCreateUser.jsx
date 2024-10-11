import React, { useState } from "react";
import { MdOutgoingMail } from "react-icons/md";
import {
  Button,
  Group,
  InputBase,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { LiaDigitalTachographSolid } from "react-icons/lia";
import { FaUserEdit, FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { TbPasswordFingerprint } from "react-icons/tb";
import { IMaskInput } from "react-imask";
import "@mantine/dates/styles.css";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import "dayjs/locale/es";

// corregir el formato del horario causa error

// const dateParser = (input) => {
//   if (input === "WW2") {
//     return new Date(1939, 8, 1);
//   }

//   // Intenta convertir el input como "DD/MM/YYYY"
//   const dateFromInput = dayjs(input, "DD/MM/YYYY", true);
//   if (dateFromInput.isValid()) {
//     return dateFromInput.toDate();
//   }

//   return null;
// };

const FormCreateUser = ({ registreForm, setView }) => {
  const [date, setDate] = useState(false);
  const [inputDate, setInputDate] = useState(null);
  const [emailVerify, setEmailVerify] = useState(false);

  // const [inputValue, setInputValue] = useState("");
  // const [error, setError] = useState("");

  function formatDateToISO(dateString = false) {
    if (dateString) {
      const date = new Date(dateString);
      const utcDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );

      if (utcDate) {
        return utcDate.toISOString().split("T")[0];
      }
    }
  }

  const registreApi = async (data) => {
    if (inputDate) {
      const formdate = formatDateToISO(inputDate);
      data.birthDate = formdate;
    }

    notifications.show({
      id: 15,
      withCloseButton: true,
      autoClose: false,
      title: `Enviando datos al registro`,
      message: "esperando...",
      color: "green",
      className: "",
      loading: true,
    });
    const url =
      "https://xynydxu4qi.us-east-2.awsapprunner.com/api/auth/register";
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: myHeaders,
      });

      const json = await response.json();
      if (json.error) {
        notifications.update({
          id: 15,
          withCloseButton: true,
          autoClose: 3000,
          title: json.message,
          message: "",
          color: "red",
          className: "",
          loading: false,
        });
      }
      if (json.roles[0] == "user") {
        notifications.update({
          id: 15,
          withCloseButton: true,
          autoClose: 3000,
          title: `${json.firstName} ${json.lastName}`,
          message: "Gracias por registrarte",
          color: "green",
          className: "",
          loading: false,
        });
        if (!json.isVerified) setEmailVerify(true);

        return;
      }
      if (!json.ok) {
        notifications.update({
          id: 15,
          withCloseButton: true,
          autoClose: 3000,
          title: "Algo salio mal",
          message: "revise su conexion a internet",
          color: "red",
          className: "",
          loading: false,
        });
      }
    } catch (error) {}
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setInputDate(value);
  };

  return (
    <form
      className=""
      onSubmit={registreForm.onSubmit((values) => registreApi(values))}
    >
      <div className="grid grid-cols-2 gap-x-10 gap-y-3">
        <TextInput
          withAsterisk
          label="DNI"
          placeholder="Ingrese su dni"
          leftSection={
            <LiaDigitalTachographSolid
              className="flex justify-center items-center"
              size={16}
            />
          }
          key={registreForm.key("dni")}
          {...registreForm.getInputProps("dni")}
        />
        <TextInput
          withAsterisk
          label="NOMBRES"
          placeholder="Ingrese su nombre"
          leftSection={
            <FaUserEdit
              className="flex justify-center items-center"
              size={16}
            />
          }
          key={registreForm.key("firstName")}
          {...registreForm.getInputProps("firstName")}
        />
        <TextInput
          withAsterisk
          label="APELLIDOS"
          placeholder="Ingrese su apellido"
          leftSection={
            <FaUserEdit
              className="flex justify-center items-center"
              size={16}
            />
          }
          key={registreForm.key("lastName")}
          {...registreForm.getInputProps("lastName")}
        />

        <TextInput
          withAsterisk
          label="CORREO"
          placeholder="ejemplo@gmail.com"
          leftSection={
            <MdOutgoingMail
              className="flex justify-center items-center"
              size={16}
            />
          }
          key={registreForm.key("email")}
          {...registreForm.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="DEPARTAMENTO"
          placeholder="Ejemplo: Lima"
          leftSection={
            <FaMapMarkerAlt
              className="flex justify-center items-center"
              size={16}
            />
          }
          key={registreForm.key("department")}
          {...registreForm.getInputProps("department")}
        />
        <TextInput
          withAsterisk
          label="PROVINCIA"
          placeholder="ejemplo: Lima"
          leftSection={
            <FaMapMarkerAlt
              className="flex justify-center items-center"
              size={16}
            />
          }
          key={registreForm.key("province")}
          {...registreForm.getInputProps("province")}
        />
        <TextInput
          withAsterisk
          label="DISTRITO"
          leftSection={
            <FaMapMarkerAlt
              className="flex justify-center items-center"
              size={16}
            />
          }
          placeholder="ejemplo: Los olivos"
          key={registreForm.key("district")}
          {...registreForm.getInputProps("district")}
        />
        <InputBase
          withAsterisk
          label="TELEFONO"
          component={IMaskInput}
          mask="000000000"
          placeholder="ejemplo: 999 999 999"
          leftSection={
            <FaPhone className="flex justify-center items-center" size={16} />
          }
          key={registreForm.key("mobileNumber")}
          {...registreForm.getInputProps("mobileNumber")}
        />
        <div>
          <label>
            <p className="font-semibold text-[.95rem] ">FECHA DE NACIMIENTO</p>
            <input
              type="date"
              name="fechaformart"
              className="fecha-registre"
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <PasswordInput
            label="CONTRASEÑA"
            placeholder="Ingrese su contraseña"
            leftSection={
              <TbPasswordFingerprint
                className="flex justify-center items-center"
                size={16}
              />
            }
            key={registreForm.key("password")}
            {...registreForm.getInputProps("password")}
          />
        </div>
      </div>
      <Group className="w-full" mt="md">
        {emailVerify && (
          <div className="font-semibold rounded-md login-email-very p-3 text-center w-full">
            Por favor, verifica tu correo electrónico antes de iniciar sesión.
          </div>
        )}
        <Button type="submit" fullWidth>
          Enviar
        </Button>
      </Group>
    </form>
  );
};

export default FormCreateUser;
