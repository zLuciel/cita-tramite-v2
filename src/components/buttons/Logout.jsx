import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

import React from "react";
import { CiLogout } from "react-icons/ci";

const Logout = () => {
  const router = useRouter();
  const handleClose = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <Button
      onClick={handleClose}
      variant="gradient"
      gradient={{ from: "red", to: "pink", deg: 90 }}
      fullWidth
      leftSection={<CiLogout size={14} />}
    >
      Cerrar sesión
    </Button>
  );
};

export default Logout;
