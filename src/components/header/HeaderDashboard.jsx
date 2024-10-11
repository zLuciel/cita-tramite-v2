"use client";
import { useEffect, useState } from "react";
import { Box, Button, Divider, NavLink } from "@mantine/core";
import { RiFolderUserFill } from "react-icons/ri";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa6";
import { useProduct } from "@/provider/ProviderContext";
import dataApi from "@/data/fetchData";
import { CiLogout } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const data2 = [
  {
    icon: RiFolderUserFill,
    label: "INSCRIPCIÓN DE INDEPENDIZACIÓN",
    description: "Distribución de bienes sin testamento",
    link: "/dashboard/documento/",
  },
  {
    icon: FaHouseUser,
    label: "INSCRIPCIÓN DE SUBDIVISIÓN DE LOTES",
    description: "Registro de división de terrenos",
     link:"/dashboard/documento/"
  },
  {
    icon: MdOutlineFamilyRestroom,
    label: "SUCESIÓN INTESTADA",
    description: "Registro de separación legal",
    link:"/dashboard/documento/"
  },
];

const followNav = [
  {
    icon: MdOutlineFamilyRestroom,
    label: "LISTA DE CITAS RESERVADAS",
    description: "Ver todas las citas reservadas",
    link:"/dashboard/cita-reservada"
  },
];

const HeaderDashboard = ({Followid}) => {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const { user, setDocumentSection, documentSection } = useProduct();


  const pathname = usePathname();
  const arrayPhatname = pathname.split("/");
  const slug = arrayPhatname[arrayPhatname.length - 1];

  const documentNew = documentSection.map((data, index) => ({
    ...data,
    ...(data2[index] || {}),
  }));
   
  

  useEffect(() => {
    const fetchData = async (token) => {
      const document = await dataApi.sectionDocument(token);
      
      setDocumentSection(document);
    };

    if (user?.token) fetchData(user.token);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, user?.token]);

  const handleClose = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  
  

  const items = documentNew.map((item, index) => (
    <Link href={`${item.link}${item.sectionSlug}-nuevos?id=${item.sectionId}`} key={index} >
    <NavLink
      key={item.sectionId}
      active={`${item.sectionSlug}-nuevos` == slug}
      label={item.sectionName}
      description={item.description}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => setActive(index)}
      color="lime"
      variant="filled"
    />
    </Link>
  ));

  const follows = followNav.map((item, index) => {
    return (
      <Link href={`${item.link} `} key={index}>
      <NavLink
        key={item.label}
        active={slug === "cita-reservada"}
        label={item.label}
        description={item.description}
        leftSection={<item.icon size="1rem" stroke={1.5} />}
        // onClick={() => setActive(4)}
        color="lime"
        variant="filled"
      /></Link>
    );
  });

  return (
    <div className="w-full headerdas flex gap-0 flex-col justify-between items-center  py-4 bg-[#365f96] text-[white]">
      <div className="w-full flex flex-col items-center  gap-4">
        <h1 className="text-center text-[1.4rem] font-semibold">
          Navegación de administrador
        </h1>
        <Box className="text-white-css" w={400}>{items}</Box>
        {/* seguimiento */}
        {true && (
          <div>
            <Divider my="xs" label="CITA RESERVADA" labelPosition="center" />
            <Box w={400}>{follows}</Box>
          </div>
        )}
      </div>
      <div className="w-full">
        {user.token && (
          <div className="w-full">
             <Divider className="lista-user-diver" my="md" label={<Link href={"/dashboard"}>LISTA USUARIOS</Link>} labelPosition="center" />
          <Button
            onClick={handleClose}
            variant="gradient"
            gradient={{ from: "red", to: "pink", deg: 90 }}
            fullWidth
            leftSection={<CiLogout size={14} />}
          >
            Cerrar sesión
          </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderDashboard;
