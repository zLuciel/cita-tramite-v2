import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Textarea } from "@mantine/core";
import { useState } from "react";
import dataApi from "@/data/fetchData";
import { FaRegStickyNote } from "react-icons/fa";
import { notifications } from "@mantine/notifications";

function ModalView({ detalle }) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleDetail = async ()=>{

    close()
    

  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Detalle del Observado">
       <p>{detalle} </p>
      </Modal>

      <Button className="self-center" onClick={open}>Ver detalle</Button>
    </>
  );
}

export default ModalView;