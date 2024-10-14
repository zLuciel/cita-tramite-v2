import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Textarea, Alert } from "@mantine/core";
import { useState } from "react";
import dataApi from "@/data/fetchData";
import { FaRegStickyNote } from "react-icons/fa";
import { notifications } from "@mantine/notifications";
import { FiAlertOctagon } from "react-icons/fi";

function ReprogramarMessage({ id, token, message }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [details, setDetails] = useState(null);
  const [alert, setAlert] = useState(false);

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
  //open
  const handleAlert = () => {
    setAlert(true);
  };
  const handleModalView = () => {
    setAlert(false);
    open();
  };
  
  if (alert) {
    return (
      <div className="absolute alert-repro flex justify-center items-center">
        <div className="max-width-reprogramar">
          <Alert
            variant="filled"
            color="rgba(255, 92, 92, 1)"
            radius="md"
            title="Alert title"
            icon={<FiAlertOctagon />}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
            officiis, quae tempore necessitatibus placeat saepe.
            <div className="flex gap-3 mt-6">
              {" "}
              <Button
                onClick={handleModalView}
                fullWidth
                variant="gradient"
                gradient={{ from: "green", to: "lime", deg: 90 }}
              >
                CONTINUAR
              </Button>
              <Button
                onClick={() => setAlert(false)}
                fullWidth
                variant="gradient"
                gradient={{ from: "pink", to: "grape", deg: 90 }}
              >
                CANCELAR
              </Button>
            </div>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Detalle el motivo de la reprogramación."
        centered
      >
        <Textarea
          autosize
          label="Escriba aqui su detalle"
          minRows={4}
          maxRows={4}
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
          onClick={() => handleAlert()}
          color="red"
          disabled={
            message === null || message === "" || message === undefined
              ? false
              : true
          }
        >
          REPROGRAMAR
        </Button>
      )}
      {message?.length > 0 && (
        <Button color="green">SU MENSAJE FUE ENVIADO</Button>
      )}
    </>
  );
}

export default ReprogramarMessage;
