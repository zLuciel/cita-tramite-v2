import { notifications } from "@mantine/notifications";

const initialMessageTable = () => {
  notifications.show({
    id: 10,
    withCloseButton: true,
    title: "Actualizando lista",
    autoClose: false,
    message: "",
    color: "black",
    className: "my-notification-class",
    loading: true,
  });
};

const messageUpdateList = () => {
  notifications.update({
    id: 10,
    withCloseButton: true,
    title: "Lista actualizada",
    autoClose: 3000,
    message: "",
    color: "green",
    className: "my-notification-class",
    loading: false,
  });
};

const messageRedux = {
  messageUpdateList,
  initialMessageTable,
};

export default messageRedux;
