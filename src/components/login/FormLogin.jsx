import React, { useState } from "react";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { Button, Group, Modal, PasswordInput, TextInput } from "@mantine/core";
import { LiaDigitalTachographSolid } from "react-icons/lia";
import { TbPasswordFingerprint } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { useProduct } from "@/provider/ProviderContext";
import dataApi from "@/data/fetchData";
import UpdateForm from "./UpdateForm";

const FormLogin = ({ form }) => {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  const [verifyEmail, setVerifyEmail] = useState(false);
  const [idUser, setIdUser] = useState("");
  // guardado de token al storage
  const [token, setToken] = useLocalStorage({
    key: "token",
    defaultValue: false,
  });

  const loginApi = async (data) => {
    notifications.show({
      id: 70,
      withCloseButton: true,
      autoClose: false,
      title: "Verificando",
      message: "espere mientras validamos su datos",
      color: "green",
      loading: true,
    });

    try {
      const jsondata = await dataApi.LoginFormPost(data);

      if (
        jsondata.address === null &&
        jsondata.district === null &&
        jsondata.mobileNumber === null
      ) {
        setIdUser(jsondata.id)
        notifications.update({
          id: 70,
          withCloseButton: true,
          autoClose: 3000,
          title: `${jsondata.firstName} ${jsondata.apellido_paterno} ${jsondata.apellido_materno}`,
          message: "Actualize sus datos por favor",
          color: "grape",
          loading: false,
        });
        open();
        return;
      }
      if (!jsondata.emailVerified) {
        setVerifyEmail(jsondata.message);
        notifications.update({
          id: 70,
          withCloseButton: true,
          autoClose: 3000,
          title: jsondata.message,
          message: "",
          color: "grape",
          loading: false,
        });
      }

      setToken(jsondata.token);

      if (jsondata.roles[0] == "user") {
        notifications.update({
          id: 70,
          withCloseButton: true,
          autoClose: 3000,
          title: `Bienvenido ${jsondata.firstName} ${jsondata.apellido_paterno} ${jsondata.apellido_materno}`,
          message: "",
          color: "green",
          loading: false,
        });
        router.push("/tramite/inscripcion-de-independizacion");
        return;
      } else if (jsondata.roles[0] == "platform-operator") {
        notifications.update({
          id: 70,
          withCloseButton: true,
          autoClose: 3000,
          title: `Bienvenido ${jsondata.firstName} ${jsondata.apellido_paterno} ${jsondata.apellido_materno}`,
          message: "",
          color: "green",
          className: "",
          loading: false,
        });

        router.push(`/dashboard/presentacion`);
        return;
      } else if (jsondata.roles[0] === "administrator") {
        notifications.update({
          id: 70,
          withCloseButton: true,
          autoClose: 3000,
          title: `Bienvenido ${jsondata.firstName} ${jsondata.apellido_paterno} ${jsondata.apellido_materno}`,
          message: "",
          color: "green",
          className: "",
          loading: false,
        });
        router.push("/dashboard/administrador/asignacion");
        return;
      }
      // router.push("/");
    } catch (error) {
      const messages = {
        400: "CONTRASEÑA INVALIDA",
        default: "DNI INCORRECTO",
      };

      const errorLogin =
        error.statusCode === 400 || error.statusCode === 401
          ? messages[400]
          : messages.default;
      if (error.statusCode) {
        setVerifyEmail(false);
        notifications.update({
          id: 70,
          withCloseButton: true,
          autoClose: 3000,
          title: "Verifique bien sus datos",
          message: "",
          color: "red",
          className: "error-login",
          loading: false,
        });
      }
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="ACTUALIZE SUS DATOS A CONTINUACIÓN" centered>
        <UpdateForm idUser={idUser} close={close} />
      </Modal>
      <form
        className="flex flex-col gap-3"
        onSubmit={form.onSubmit((values) => loginApi(values))}
      >
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
          key={form.key("dni")}
          {...form.getInputProps("dni")}
        />

        <PasswordInput
          withAsterisk
          label="CONTRASEÑA"
          placeholder="Ingrese su contraseña"
          leftSection={
            <TbPasswordFingerprint
              className="flex justify-center items-center"
              size={16}
            />
          }
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <Group className="w-full" mt="md">
          {verifyEmail && (
            <div className="font-semibold rounded-md login-email-very p-3 text-center">
              {verifyEmail}
            </div>
          )}
          <Button type="submit" fullWidth>
            Iniciar sesion
          </Button>
        </Group>
      </form>
    </>
  );
};

export default FormLogin;
