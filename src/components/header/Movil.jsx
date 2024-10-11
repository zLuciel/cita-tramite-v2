"use client";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Burger, Avatar } from "@mantine/core";
import Header from "./Header";

import { useProduct } from "@/provider/ProviderContext";
import NewHeaderDashboard from "./NewHeaderDashboard";
import Logout from "../buttons/Logout";

function Movil({ Followid, role }) {
  const { user } = useProduct();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <nav className="bg-white bg-blue px-10 flex justify-between items-center py-5">
      <div className="flex gap-3 justify-center items-center mr-3">
        <Avatar variant="filled" radius="sm" color="lime" src="" />
        <p className="font-semibold text-white uppercase">
          {user.firstName} {user.lastName}
        </p>
      </div>
      {role !== "administrator" && (
        <>
          {" "}
          <Drawer className="" opened={opened} onClose={close}>
            {role === "super user" && <NewHeaderDashboard />}
            {role !== "super user" && <Header Followid={Followid} />}
          </Drawer>
          <Burger color="lime" onClick={open} aria-label="Toggle navigation" />
        </>
      )}
      {role === "administrator" && <div style={{maxWidth:"300px"}}><Logout/></div>}
    </nav>
  );
}

export default Movil;
