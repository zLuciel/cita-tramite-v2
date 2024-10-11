import { Button } from '@mantine/core'
import React from 'react'
import { MdOutgoingMail } from 'react-icons/md'

const Encuesta = () => {

    const handleFormularioEmail = async () => {
        notifications.show({
        id:40,
        withCloseButton: true,
        autoClose: false,
        title: "Enviando",
        message: "",
        color:"green",
        className: "",
        loading: true,
      });
  
      const sendEmail = await dataApi.sendEmailUser(user.token, emailUser);
      if(sendEmail.ok){
        const resetHisory = await dataApi.deleteHisoryUser(user.token,idSection,idUserParams)
        
        notifications.update({
          id: 40,
          withCloseButton: true,
          autoClose: 3000,
          title: `Encuesta enviada correctamente`,
          message: "",
          color:"green",
          className: "",
          loading: false,
        });
      }
      router.back()
    };
   
  return (
    <Button
    className="mt-4"
    onClick={handleFormularioEmail}
    rightSection={<MdOutgoingMail size={24} />}
    variant="gradient"
    gradient={{ from: "indigo", to: "violet", deg: 90 }}
  >
    ENVIAR ENCUESTA
  </Button>
  )
}

export default Encuesta