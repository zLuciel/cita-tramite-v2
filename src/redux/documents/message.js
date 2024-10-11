import { notifications } from "@mantine/notifications";

const initialMessageLogin = () => {
  notifications.show({
    id: 70,
    withCloseButton: true,
    autoClose: false,
    title: "Verificando",
    message: "espere mientras validamos su datos",
    color: "green",
    loading: true,
  });
};
const messageLogin = (data) => {
  if (data.roles[0] == "user") {
    notifications.update({
      id: 70,
      withCloseButton: true,
      autoClose: 3000,
      title: `Bienvenido ${data.firstName} ${data.lastName} `,
      message: "",
      color: "green",
      loading: false,
    });
  } else if (data.roles[0] == "super-user") {
    notifications.update({
      id: 70,
      withCloseButton: true,
      autoClose: 3000,
      title: `Bienvenido ${data.firstName} ${data.lastName} `,
      message: "",
      color: "green",
      className: "",
      loading: false,
    });
  }
};

const messageRedux = {
  messageLogin,
  initialMessageLogin,
};

export default messageRedux;
