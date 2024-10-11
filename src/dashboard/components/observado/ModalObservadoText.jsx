import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Textarea } from "@mantine/core";
import { useState } from "react";
import dataApi from "@/data/fetchData";
import { FaRegStickyNote } from "react-icons/fa";
import { notifications } from "@mantine/notifications";

function ModalObservadoText({ id, token }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [details,setDetails] = useState(null)

  const handleDetail = async ()=>{

    const res = await dataApi.updateStatus(token, null, id, details);
    if(res.details){
        notifications.show({
            id: id,
            withCloseButton: true,
            autoClose: 3000,
            title: "El detalle fue enviado",
            message: "",
            color: "black",
            icon: <FaRegStickyNote />,
            className: "my-notification-class",
            style: { backgroundColor: "greenyellow" },
            loading: false,
          });
    }
    close()
    

  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Detalle del Observado">
        <Textarea
          label="Escriba aqui su detalle"
          placeholder="..."
          onChange={(event) => setDetails(event.currentTarget.value)}
        />
        <Button variant="filled" onClick={handleDetail}>ENVIAR</Button>
      </Modal>

      <Button onClick={open}>Detallar</Button>
    </>
  );
}

export default ModalObservadoText;
