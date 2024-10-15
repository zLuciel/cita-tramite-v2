import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Input, TextInput, InputBase } from "@mantine/core";
import { MdEmail } from "react-icons/md";
import sjl from "@/assets/logo.png";
import Image from "next/image";
import { useForm } from "@mantine/form";
import dataApi from "@/data/fetchData";
import { notifications } from "@mantine/notifications";
import { LiaDigitalTachographSolid } from "react-icons/lia";
import { IMaskInput } from "react-imask";

const ModalPasswordReset = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const formEmail = useForm({
    mode: "uncontrolled",
    initialValues: {
      dni: "",
    },

    validate: {
      dni: (value) =>
        /^\d{8}$/.test(value) ? null : "Ingrese un numero de documento válido",
    },
  });

  const HandleRecuEmail = async (value) => {
    notifications.show({
      id: 15,
      withCloseButton: true,
      autoClose: false,
      title: `Enviando al correo su recuperación de contraseña`,
      message: "esperando...",
      color: "green",
      className: "",
      loading: true,
    });

    const res = await dataApi.ResetPassword(value.dni);

    if (res.success) {
      notifications.update({
        id: 15,
        withCloseButton: true,
        autoClose: 3000,
        title: res.message,
        message: "",
        color: "green",
        className: "",
        loading: false,
      });
      close();
    }
    if (!res.success) {
      notifications.update({
        id: 15,
        withCloseButton: true,
        autoClose: 3000,
        title: res.errors.numero_documento,
        message: "",
        color: "red",
        className: "",
        loading: false,
      });
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form
          className="flex flex-col gap-3"
          onSubmit={formEmail.onSubmit((values) => HandleRecuEmail(values))}
        >
          <div className="flex justify-center items-center mb-2">
            <Image src={sjl} width={250} alt="logo san juan de lurigancho" />
          </div>
          <InputBase
            withAsterisk
            label="Recuperación de contraseña"
            component={IMaskInput}
            mask="00000000"
            placeholder="Ingrese su dni"
            leftSection={
              <LiaDigitalTachographSolid
                className="flex justify-center items-center"
                size={16}
              />
            }
            key={formEmail.key("dni")}
            {...formEmail.getInputProps("dni")}
          />
          <Button
            type="submit"
            fullWidth
            className="mt-4"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            ENVIAR RECUPERACIÓN DE CONTRASEÑA
          </Button>
        </form>
      </Modal>

      <p className="text-xs cursor-pointer-login" onClick={open}>
        Olvide mi contraseña
      </p>
    </>
  );
};

export default ModalPasswordReset;
