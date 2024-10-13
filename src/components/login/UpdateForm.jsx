import dataApi from "@/data/fetchData";
import { Button, InputBase, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IMaskInput } from "react-imask";

const UpdateForm = ({ idUser,close }) => {
  const updateForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      address: "",
      district: "",
      mobileNumber: "",
      idUser: idUser,
    },

    validate: {
      mobileNumber: (value) =>
        /^\d{9}$/.test(value) ? null : "Ingrese un número válido",
      address: (value) => (value.trim() ? null : "La dirección es obligatoria"),
      district: (value) => (value.trim() ? null : "El distrito es obligatorio"),
    },
  });

  const loginUpdate = async (data) => {
    notifications.show({
      id: 11,
      withCloseButton: true,
      autoClose: false,
      title: `Actualizando datos...`,
      message: "",
      color: "green",
      className: "",
      loading: true,
    });
    const resUpdate = await dataApi.UpdateUserLogin(data);
    if (resUpdate.ok) {
      notifications.update({
        id: 11,
        withCloseButton: true,
        autoClose: 3000,
        title: resUpdate.message,
        message: "",
        color: "green",
        className: "",
        loading: false,
      });
      close()
    }
  };

  return (
    <form onSubmit={updateForm.onSubmit((values) => loginUpdate(values))}>
      <TextInput
        withAsterisk
        label="DIRECCIÓN"
        placeholder="Ejemplo: jr sol de oro 7028"
        leftSection={
          <FaMapMarkerAlt
            className="flex justify-center items-center"
            size={16}
          />
        }
        key={updateForm.key("address")}
        {...updateForm.getInputProps("address")}
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
        key={updateForm.key("district")}
        {...updateForm.getInputProps("district")}
      />
      <InputBase
        withAsterisk
        label="TELÉFONO"
        component={IMaskInput}
        mask="000000000"
        placeholder="ejemplo: 999 999 999"
        leftSection={
          <FaPhone className="flex justify-center items-center" size={16} />
        }
        key={updateForm.key("mobileNumber")}
        {...updateForm.getInputProps("mobileNumber")}
      />

      <Button className="mt-4" type="submit" fullWidth>
        ACTUALIZAR MIS DATOS
      </Button>
    </form>
  );
};

export default UpdateForm;
