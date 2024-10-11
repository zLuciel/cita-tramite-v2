import { useState } from "react";
import { FileButton, Button, Group, Text } from "@mantine/core";
import { FaCloudArrowUp } from "react-icons/fa6";
import dataApi from "@/data/fetchData";
import { useProduct } from "@/provider/ProviderContext";
import { notifications } from "@mantine/notifications";
import { FaFilePdf } from "react-icons/fa";

const BtnObserv = ({ idFile, setStateFile, stateFile, nameDocumet,setRefresh,refresh }) => {
  const { user } = useProduct();
  const [files, setFiles] = useState([]);
 
  

  const handleObservado = async (file) => {
    if (file.type === "application/pdf") {
      try {
        const res = await dataApi.updateFile(user.token, file, idFile, true);
        console.log(res,"viendo pdf");
          
        if (res.fileUrl) {
          notifications.show({
            id: idFile,
            withCloseButton: true,
            autoClose: 3000,
            title: "Archivo PDF subido",
            message: "",
            color: "black",
            icon: <FaFilePdf />,
            className: "my-notification-class",
            style: { backgroundColor: "greenyellow" },
            loading: false,
          });
          setRefresh(!refresh)
        }
      } catch (error) {
        console.log(error);
        
      }
      
      // setStateFile({...stateFile,[nameDocumet]:"EN PROCESO"})
    }
  };

  return (
    <Group justify="center" className="self-center">
      <FileButton
        onChange={(value) => handleObservado(value)}
        accept="application/pdf"
      >
        {(props) => (
          <Button {...props}>
            <FaCloudArrowUp className="mr-2" />
            SUBIR
          </Button>
        )}
      </FileButton>
    </Group>
  );
};

export default BtnObserv;
