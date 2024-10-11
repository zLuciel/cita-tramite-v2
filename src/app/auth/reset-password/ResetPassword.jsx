"use client";
import { useProduct } from "@/provider/ProviderContext";
import { Button, PasswordInput, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import sjl from "@/assets/logo.png";
import { useForm } from "@mantine/form";
import dataApi from "@/data/fetchData";
import { notifications } from "@mantine/notifications";

const ResetPassword = () => {
  const { user } = useProduct();
  const searchParams = useSearchParams();
  const tokenPassword = searchParams.get("token");
  const router = useRouter();
  // const [visible, { toggle }] = useDisclosure(false);

  const formPassword = useForm({
    initialValues: {
      passwordNew: "",
      passwordRepet: "",
    },

    validate: {
      passwordNew: (value) =>
        value.length < 6
          ? "La contraseña debe tener al menos 6 caracteres"
          : null,
      passwordRepet: (value, values) =>
        value !== values.passwordNew ? "Las contraseñas no coinciden" : null,
    },
  });

  const HandleRecuEmail = async (values) => {
    notifications.show({
      id: 5,
      withCloseButton: true,
      autoClose: false,
      title: "Estableciendo contraseña...",
      message: "",
      color: "green",
      // icon: <FaFilePdf />,
      className: "my-notification-class",
      loading: true,
    });
    const resPassword = await dataApi.newPassword(
      tokenPassword,
      values.passwordNew
    );

    if (resPassword.statusCode === 201) {
      notifications.update({
        id: 5,
        withCloseButton: true,
        autoClose: 3000,
        title: resPassword.message,
        message: "",
        color: "green",
        // icon: <FaFilePdf />,
        className: "my-notification-class",
        loading: false,
      });

      router.push("/");
    }
  };

  return (
    <main className="login-page flex justify-center items-center">
      <form
        className="border-2 px-8 py-10 bg-white rounded-xl login"
        onSubmit={formPassword.onSubmit((values) => HandleRecuEmail(values))}
      >
        <div className="flex flex-col justify-center items-center mb-4">
          <Image src={sjl} width={250} alt="logo san juan de lurigancho" />
          <h3 className="text-2xl font-semibold">Recuperacion de contraseña</h3>
        </div>
        <div className="flex flex-col gap-2">
          <PasswordInput
            label="Nueva Contraseña"
            placeholder="Ingrese su contraseña"
            {...formPassword.getInputProps("passwordNew")}
          />
          <PasswordInput
            label="Confirmar contraseña"
            placeholder="Repita aqui su contraseña nueva"
            {...formPassword.getInputProps("passwordRepet")}
          />
        </div>

        <Button
          type="submit"
          fullWidth
          className="mt-4"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          ENVIAR
        </Button>
      </form>
    </main>
  );
};

export default ResetPassword;
