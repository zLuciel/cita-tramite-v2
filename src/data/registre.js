import { notifications } from "@mantine/notifications";

const notificationsUser = () => {
  notifications.show({
    id: "hello-there",
    position: "bottom-center",
    withCloseButton: true,
    onClose: () => console.log("unmounted"),
    onOpen: () => console.log("mounted"),
    autoClose: 5000,
    title: "You've been compromised",
    message: "Leave the building immediately",
    color: "red",
    // icon: <IconX />,
    className: "my-notification-class",
    style: { backgroundColor: "red" },
    loading: false,
  });
};

function formatDateToISO(dateString) {
  const date = new Date(dateString);
  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return utcDate.toISOString().split("T")[0];
}

const registreApi = async (data, dateRegistre) => {
  const formdate = formatDateToISO(dateRegistre);
  data.birthDate = formdate;

  const url = "https://xynydxu4qi.us-east-2.awsapprunner.com/api/auth/register";
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders,
    });

    const json = await response.json();
    if (json) {
      // Noticacion de registro usuario
      notificationsUser()
    }
    
    console.log(json);
  } catch (error) {
    console.error(error, "error");
  }
};

export default registreApi;
