import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Tooltip } from "@mantine/core";
import CitaComponente from "@/components/cita/CitaComponente";

const ModalCita = ({
  idSection,
  verified,
  idUserParams,
  setVerifyCita,
  setRefresh,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [viewVery, setViewVerty] = useState(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="ASIGNACIÓN DE CITA"
        centered
      >
        <CitaComponente
          close={close}
          setViewVerty={setViewVerty}
          setRefreshSkip={setRefresh}
          setVerifyCita={setVerifyCita}
          id={idSection}
          idUserParams={idUserParams}
        />
      </Modal>
      <Tooltip
        label={
          !verified || viewVery
            ? "El estado de los documentos debe estar verificado"
            : "Puede asignarle una cita"
        }
      >
        <Button
          disabled={!verified || viewVery}
          onClick={open}
          className="uppercase"
          variant="gradient"
          gradient={{ from: "blue", to: "violet", deg: 90 }}
        >
          Asignar Cita
        </Button>
      </Tooltip>
    </>
  );
};

export default ModalCita;
