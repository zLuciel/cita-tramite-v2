import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Textarea } from "@mantine/core";
import { useState } from "react";
import dataApi from "@/data/fetchData";
import { FaRegStickyNote } from "react-icons/fa";
import { notifications } from "@mantine/notifications";

function ReprogramarMessage({ id, token, message }) {
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

    const res = await dataApi.updateMessageCite(token, id, details);
    console.log({
      token,
      id,
      details
    });
    
    console.log(res,"enviando mensaje");
    
    if (res.id) {
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
  console.log(message,"viendo message");
  
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Detalle el motivo de la reprogramación."
      >
        <Textarea
          label="Escriba aqui su detalle"
          placeholder="..."
          onChange={(event) => setDetails(event.currentTarget.value)}
        />
        <Button
          className="mt-4"
          variant="filled"
          color="red"
          fullWidth
          onClick={handleDetail}
        >
          ENVIAR MENSAJE
        </Button>
      </Modal>

      {(message === null || message === "" || message === undefined) && (
        <Button
          onClick={open}
          color="red"
          disabled={message === null || message === "" || message === undefined ? false : true}
        >
          REPROGRAMAR
        </Button>
      )}
      {message !== null || message !== undefined && (
        <Button color="green">SU MENSAJE FUE ENVIADO</Button>
      )}
    </>
  );
}

export default ReprogramarMessage;
