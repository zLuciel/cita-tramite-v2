import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Textarea } from "@mantine/core";
import { useState } from "react";
import dataApi from "@/data/fetchData";
import { FaRegStickyNote } from "react-icons/fa";
import { notifications } from "@mantine/notifications";

function ReprogramarMessage({ id, token }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [details, setDetails] = useState(null);

  const handleDetail = async () => {
    notifications.show({
      id: id,
      withCloseButton: true,
      autoClose: false,
      title: "Enviando mensaje...",
      message: "",
      color: "green",
      icon: <FaRegStickyNote />,
      className: "my-notification-class",
      loading: true,
    });

    const res = await dataApi.updateMessageCite(token,idCita, details);
    if (res.details) {
      notifications.update({
        id: id,
        withCloseButton: true,
        autoClose: 3000,
        title: "El mensaje se envió con éxito.",
        message: "",
        color: "green",
        icon: <FaRegStickyNote />,
        className: "my-notification-class",
        loading: false,
      });
    }
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Detalle el motivo de la reprogramación.">
        <Textarea
          label="Escriba aqui su detalle"
          placeholder="..."
          onChange={(event) => setDetails(event.currentTarget.value)}
        />
        <Button className="mt-4" variant="filled" color="red" fullWidth onClick={handleDetail}>
          ENVIAR MENSAJE
        </Button>
      </Modal>

      <Button onClick={open}>REPROGRAMAR</Button>
    </>
  );
}

export default ReprogramarMessage;
