"use client";
import { Box, Divider, NavLink } from "@mantine/core";
import { RiFolderUserFill } from "react-icons/ri";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import Logout from "../buttons/Logout";

const data2 = [
  {
    icon: RiFolderUserFill,
    label: "INSCRIPCIÓN DE INDEPENDIZACIÓN",
    description: "Distribución de bienes sin testamento",
    link: "/tramite/inscripcion-de-independizacion",
  },
  {
    icon: FaHouseUser,
    label: "INSCRIPCIÓN DE SUBDIVISIÓN DE LOTES",
    description: "Registro de división de terrenos",
    link: "/tramite/inscripcion-de-subdivision-de-lotes",
  },
  {
    icon: MdOutlineFamilyRestroom,
    label: "SUCESIÓN INTESTADA",
    description: "Registro de separación legal",
    link: "/tramite/sucesion-intestada",
  },
];

const Header = ({ Followid }) => {
  // const {documentSection } = useProduct();
  const { allDocumets } = useSelector((state) => state.DocumentsGlobalRedux);

  const pathname = usePathname();
  const arrayPhatname = pathname.split("/");
  const slug = arrayPhatname[arrayPhatname.length - 1];
  const documentNew = allDocumets.map((data, index) => ({
    ...data,
    ...(data2[index] || {}),
  }));


  const tramite = documentNew.map((item, index) => (
    <Link href={item.link} key={index}>
      <NavLink
        key={item.sectionId}
        active={item.sectionSlug == slug}
        label={item.sectionName}
        description={item.description}
        leftSection={<item.icon size="1rem" stroke={1.5} />}
        color="lime"
        variant="filled"
      />
    </Link>
  ));

  const follows = documentNew.map((item, index) => {
    return (
      <Link
        href={`/tramite/seguimiento-${item.sectionSlug}?id=${item.sectionId}`}
        key={item.sectionId}
      >
        <NavLink
          key={item.sectionId}
          active={`seguimiento-${item.sectionSlug}` === slug}
          label={item.sectionName}
          description={item.description}
          leftSection={<item.icon size="1rem" stroke={1.5} />}
          color="lime"
          variant="filled"
        />
      </Link>
    );
  });

  return (
    <div className="w-full flex gap-0 flex-col justify-between  items-center  py-4 bg-[#365f96] text-[white]">
      <div className="w-full flex flex-col items-center  gap-4">
        <h1 className="text-center text-[1.4rem] font-semibold">
          ¿Qué trámite desea realizar?
          <Divider my="xs" label="TRAMITES" labelPosition="center" />
        </h1>
        <Box className="text-white-css" w={320}>
          {tramite}
        </Box>
        {/* seguimiento */}
        {true && (
          <div>
            <Divider my="xs" label="SEGUIMIENTO" labelPosition="center" />
            <Box w={320}>{follows}</Box>
          </div>
        )}
      </div>
      <div className="w-full px-5">
       <Logout/>
      </div>
    </div>
  );
};

export default Header;
