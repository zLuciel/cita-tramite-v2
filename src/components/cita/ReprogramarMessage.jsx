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
      <div className="absolute alert-repro flex justify-center items-center px-3">
        <div className="max-width-reprogramar">
          <Alert
            className="border-color-orange"
            variant="white"
            color="orange"
            radius="md"
            title="Alert title"
            icon={<FiAlertOctagon />}
          >
            <div className="py-4">
              <h3 className="text-3xl font-semibold mb-3 uppercase">
                ¿Estás seguro de que deseas reprogramar tu cita?
              </h3>
              <p>
                {" "}
                Al reprogramar tu cita, se cancelará la fecha y hora actuales, y
                nos pondremos en contacto contigo para confirmar la nueva
                disponibilidad. Esta acción no puede deshacerse. ¿Deseas
                continuar con la reprogramación de la cita?
              </p>

              <div className="flex gap-3 mt-6">
                {" "}
                <Button
                  onClick={handleModalView}
                  fullWidth
                  variant="light"
                  color="green"
                >
                  CONTINUAR
                </Button>
                <Button
                  onClick={() => setAlert(false)}
                  fullWidth
                  variant="light"
                  color="red"
                >
                  CANCELAR
                </Button>
              </div>
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
