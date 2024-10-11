import React, { useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { LiaDigitalTachographSolid } from "react-icons/lia";
import { TbPasswordFingerprint } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { useProduct } from "@/provider/ProviderContext";

const FormLogin = ({ form }) => {
  const router = useRouter();
  const { documentSection } = useProduct();

  const [verifyEmail, setVerifyEmail] = useState(false);
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

    const url = "https://xynydxu4qi.us-east-2.awsapprunner.com/api/auth/login";
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: myHeaders,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw { statusCode: errorData?.statusCode };
      }

      const jsondata = await response.json();

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
          title: `Bienvenido ${jsondata.firstName} ${jsondata.lastName} `,
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
          title: `Bienvenido ${jsondata.firstName} ${jsondata.lastName} `,
          message: "",
          color: "green",
          className: "",
          loading: false,
        });
        
        router.push(
          `/dashboard/presentacion`
        );
        return;
      }else if (jsondata.roles[0] === "administrator"){
        notifications.update({
          id: 70,
          withCloseButton: true,
          autoClose: 3000,
          title: `Bienvenido ${jsondata.firstName} ${jsondata.lastName} `,
          message: "",
          color: "green",
          className: "",
          loading: false,
        });
        router.push("/dashboard/administrador/asignacion")
        return
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
  );
};

export default FormLogin;
