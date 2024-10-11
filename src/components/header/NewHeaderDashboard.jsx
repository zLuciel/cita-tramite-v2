import { Badge, Box, Divider, NavLink } from "@mantine/core";
import Link from "next/link";
import React, { useState, useMemo } from "react";

import { usePathname } from "next/navigation";

import { RiFolderUserFill } from "react-icons/ri";
import { FaHouseUser } from "react-icons/fa6";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { useProduct } from "@/provider/ProviderContext";
import {
  BsCalendar2CheckFill,
  BsCalendar2DateFill,
  BsCalendarXFill,
} from "react-icons/bs";

import Logout from "../buttons/Logout";

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
    link: "/dashboard/documento/",
  },
  {
    icon: MdOutlineFamilyRestroom,
    label: "SUCESIÓN INTESTADA",
    description: "Registro de separación legal",
    link: "/dashboard/documento/",
  },
];

const followNav = [
  {
    icon: BsCalendar2CheckFill,
    label: "LISTA DE CITAS RESERVADAS",
    description: "Visualizar todas las citas reservadas.",
    link: "/dashboard/cita-reservada",
    slug: "cita-reservada",
  },
  {
    icon: BsCalendarXFill,
    label: "LISTA DE CITAS NO ASIGNADAS",
    description: "Documentos verificados, pero aún no se ha asignado una cita.",
    link: "/dashboard/cita-reservada-no-asignada",
    slug: "cita-reservada-no-asignada",
  },
];

const NewHeaderDashboard = ({ Followid }) => {
  const { user, setDocumentSection, documentSection } = useProduct();
  const [countProcess, setCountProcess] = useState(0);
  const pathname = usePathname();
  const arrayPathname = pathname.split("/");
  const slug = arrayPathname[arrayPathname.length - 1];

  // Usa useMemo para memorizar el cálculo de items y pendientes
  const documentNew = useMemo(() => {
    return documentSection.map((data, index) => ({
      ...data,
      ...(data2[index] || {}),
    }));
  }, [documentSection]);

  const items = useMemo(() => {
    return (
      <NavLink
        label={
          <div className="flex gap-3">
            LISTA DE DOCUMENTOS NUEVOS
            <Badge
              variant="gradient"
              gradient={{ from: "blue", to: "violet", deg: 90 }}
              size="md"
              circle
            >
              {countProcess}
            </Badge>
          </div>
        }
        description="Documentos que se ingresan por primera vez."
      >
        {documentNew.map((item) => {
          const WithCompleteStatus = item.statusCounts.find(
            (itemStatus) => itemStatus.status === "COMPLETO"
          );
          const totalCompleteCount = item.statusCounts
            .filter((itemStatus) => itemStatus.status === "COMPLETO") // Filtrar los que tienen status COMPLETO
            .reduce(
              (sum, itemStatus) => sum + parseInt(itemStatus.count, 10),
              0
            );

          setCountProcess(totalCompleteCount);
          return (
            <Link
              href={`${item.link}${item.sectionSlug}-nuevos?idnuevo=${item.sectionId}`}
              key={`${item.sectionSlug}-nuevos`}
            >
              <NavLink
                active={`${item.sectionSlug}-nuevos` === slug}
                label={
                  <div className="flex gap-3">
                    {item.sectionName}{" "}
                    <Badge
                      variant="gradient"
                      gradient={{ from: "blue", to: "violet", deg: 90 }}
                      size="md"
                      circle
                    >
                      {WithCompleteStatus?.count || 0}
                    </Badge>
                  </div>
                }
                description={item.description}
                leftSection={<item.icon size="1rem" stroke={1.5} />}
                color="lime"
                variant="filled"
              />
            </Link>
          );
        })}
      </NavLink>
    );
  }, [countProcess, documentNew, slug]); // Dependencias

  const pedientes = useMemo(() => {
    return documentNew.map((item) => {
      const WithCompleteStatusOb = item.statusCounts.find(
        (itemStatus) => itemStatus.status === "OBSERVADO"
      );
      return (
        <Link
          href={`${item.link}${item.sectionSlug}-pendientes?idpendiente=${item.sectionId}`}
          key={`${item.sectionSlug}-pendientes`}
        >
          <NavLink
            active={
              `${item.sectionSlug}-pendientes-corregido` === slug ||
              `${item.sectionSlug}-pendientes-no-corregido` === slug
            }
            label={item.sectionName}
            description={item.description}
            leftSection={<item.icon size="1rem" stroke={1.5} />}
            color="lime"
            variant="filled"
          >
            <Link
              href={`${item.link}${item.sectionSlug}-pendientes-corregido?idpendiente=${item.sectionId}`}
            >
              <NavLink
                active={`${item.sectionSlug}-pendientes-corregido` === slug}
                label="PENDIENTE YA CORREGIDOS"
                description="Documentos que el usuario ya corrigió"
                color="lime"
              />
            </Link>
            <Link
              href={`${item.link}${item.sectionSlug}-pendientes-no-corregido?id-subpendiente=${item.sectionId}`}
            >
              <NavLink
                active={`${item.sectionSlug}-pendientes-no-corregido` === slug}
                color="lime"
                label={
                  <div className="flex gap-3">
                    PENDIENTE NO CORREGIDO{" "}
                    <Badge
                      variant="gradient"
                      gradient={{ from: "blue", to: "violet", deg: 90 }}
                      size="md"
                      circle
                    >
                      {WithCompleteStatusOb?.count || 0}
                    </Badge>
                  </div>
                }
                description="Documentos que el usuario no corrigió"
              />
            </Link>
          </NavLink>
        </Link>
      );
    });
  }, [documentNew, slug]); // Dependencias

  const follows = useMemo(() => {
    return (
      // <Link href={`${item.link}`} key={"cita-reservada"}>
      <NavLink
        active={
          slug === "cita-reservada" || "cita-reservada-no-asignada" === slug
        }
        label={"SECCIÓN DE CITAS"}
        description={"Citas asignadas o citas por asignar"}
        leftSection={<BsCalendar2DateFill />}
        color="lime"
        variant="filled"
      >
        {" "}
        {followNav.map((item, index) => (
          <Link href={`${item.link}`} key={index}>
            <NavLink
              active={slug === item.slug}
              label={item.label}
              description={item.description}
              leftSection={<item.icon size="1rem" stroke={1.5} />}
              color="lime"
              variant="subtle"
            />
          </Link>
        ))}
      </NavLink>
      // </Link>
    );
  }, [slug]); // Dependencias

  // if (loading) {
  //   return <HeaderSkeleton />;
  // }

  return (
    <div className="w-full headerdas flex gap-0 flex-col justify-between items-center py-4  text-[white]">
      <div className="w-full flex flex-col items-center gap-4">
        <h1 className="text-center text-[1.4rem] font-semibold">
          Navegación de administrador
        </h1>
        <div>
          <Divider
            my="xs"
            label="LISTA DE DOCUMENTOS NUEVOS"
            labelPosition="center"
          />
          <Box className="text-white-css" w={400}>
            {items}
          </Box>
        </div>

        <div>
          <Divider
            my="xs"
            label="LISTA DE DOCUMENTOS PENDIENTES"
            labelPosition="center"
          />
          <Box className="text-white-css" w={400}>
            {pedientes}
          </Box>
        </div>

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
            <Divider
              className="lista-user-diver"
              my="md"
              label={<Link href={"/dashboard"}>LISTA USUARIOS</Link>}
              labelPosition="center"
            />
            <Logout />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewHeaderDashboard;
