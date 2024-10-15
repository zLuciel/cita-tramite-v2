"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { IoEyeSharp } from "react-icons/io5";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import esLocaleText from "./traductor";
import { Button, Checkbox, MultiSelect, Popover, Select } from "@mantine/core";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import SelectAsing from "@/components/pruebatesteo/select/SelectAsing";
import dataApi from "@/data/fetchData";
import { useProduct } from "@/provider/ProviderContext";
import { notifications } from "@mantine/notifications";

export default function TableAsignacion({ allUser, dataSelect, nameSection }) {
  const { user } = useProduct();
  const [rows, setRows] = React.useState(allUser);
  const router = useRouter();
  const [selectValue, setSelectValue] = React.useState([]);
  const [memoryGetPermiss, setMemoryGetPermiss] = React.useState([]);

  React.useEffect(() => {
    const formattedUsers = allUser.map((user) => ({
      ...user,
      dni:user.mobileNumber,
      id: user.id,
      firstName: user.firstName?.toUpperCase() || "",
      lastName: user.lastName?.toUpperCase() || "",
      birthDate: user.birthDate?.split("-").reverse().join("/"),
      department: user.department?.toUpperCase() || "",
      province: user.province?.toUpperCase() || "",
      district: user.district?.toUpperCase() || "",
    }));
    setRows(formattedUsers);
  }, [allUser]);

  const handleSectionAsing = async (sectionId, idUser) => {
    const veryNewSet = memoryGetPermiss.length < sectionId.length;
    notifications.show({
      id: 7,
      withCloseButton: true,
      autoClose: false,
      title: `Cargando...`,
      message: "",
      color: "green",
      className: "",
      loading: true,
    });
    //si es eliminar
    if (!veryNewSet) {
      const deleteFilter = memoryGetPermiss
        .filter((item) => !sectionId.includes(item.section.id))
        .map((item) => item.id); // Filtramos los que no están en arrayIds
      const deleteSection = await dataApi.deleteValueAccess(
        user.token,
        deleteFilter
      );

      if (deleteSection.ok) {
        notifications.update({
          id: 7,
          withCloseButton: true,
          autoClose: 3000,
          title: `Sección eliminada`,
          message: "",
          color: "red",
          className: "",
          loading: false,
        });
      }

      const valueAccess = await dataApi.getValueAccess(user.token, idUser);
      const arrayValueAccess = valueAccess.map((value) => value.section.id);

      setSelectValue(arrayValueAccess);
      setMemoryGetPermiss(valueAccess);
    } else if (veryNewSet) {
      // Si no se eliminó nada, es una nueva asignación
      notifications.update({
        id: 7,
        withCloseButton: true,
        autoClose: false,
        title: `Asignando espere..`,
        message: "",
        color: "green",
        className: "",
        loading: true,
      });

      const createSection = await dataApi.CreateAsingSection(
        user.token,
        sectionId[sectionId.length - 1],
        idUser
      );

      if (createSection.hasAccess) {
        notifications.update({
          id: 7,
          withCloseButton: true,
          autoClose: 3000,
          title: `Asignacion creada`,
          message: "",
          color: "green",
          className: "",
          loading: false,
        });
      }
      const valueAccess = await dataApi.getValueAccess(user.token, idUser);
      const arrayValueAccess = valueAccess.map((value) => value.section.id);

      setSelectValue(arrayValueAccess);
      setMemoryGetPermiss(valueAccess);
    }

    // Actualizar el valor seleccionado en el estado

    setSelectValue(sectionId);
  };

  const handleSetDataselect = async (idUser) => {
    const valueAccess = await dataApi.getValueAccess(user.token, idUser);
    const arrayValueAccess = valueAccess.map((value) => value.section.id);

    setSelectValue(arrayValueAccess);
    setMemoryGetPermiss(valueAccess);
  };

  const handlePermiss = () => {};
  const columns = [
    {
      field: "actions",
      headerName: "ACTIVOS",
      width: 150,
      renderCell: (params) => (
        <span
          style={{ height: "100%" }}
          className="h-full flex justify-center items-center"
        >
          <Checkbox
            label="ACTIVO"
            color="lime"
            onChange={() => handlePermiss()}
          />
        </span>
      ),
    },
    {
      field: "asignacion",
      headerName: "ASIGNACIÓN",
      width: 180,
      renderCell: (params) => (
        <span
          onClick={() => handleSetDataselect(params.id)}
          style={{ height: "100%" }}
          className="h-full flex justify-center items-center"
        >
          <Popover width={300} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button
                rightSection={<IoIosArrowDropdownCircle size={18} />}
                variant="gradient"
                gradient={{ from: "lime", to: "green", deg: 90 }}
              >
                Asigne sección
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <SelectAsing
                selectValue={selectValue}
                dataSelect={dataSelect}
                handleSectionAsing={handleSectionAsing}
                idUser={params.id}
                idSection={params}
              />
            </Popover.Dropdown>
          </Popover>
        </span>
      ),
    },
    { field: "dni", headerName: "DNI", width: 150, editable: false },
    { field: "firstName", headerName: "Nombres", width: 150, editable: false },
    { field: "apellido_paterno", headerName: "Apellidos Paterno", width: 150, editable: false },
    { field: "apellido_materno", headerName: "Apellidos Materno", width: 150, editable: false },
    {
      field: "address",
      headerName: "Direción",
      width: 200,
      editable: false,
    },
    { field: "district", headerName: "Distrito", width: 150, editable: false },
    {
      field: "mobileNumber",
      headerName: "Teléfono",
      width: 150,
      editable: false,
    },
    { field: "email", headerName: "Gmail", width: 200, editable: false },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
        "& .MuiDataGrid-root": {
          backgroundColor: "#ffffff", // Fondo verde amarillento modificado
          border: "1px solid #ccc", // Añadir una rejilla general
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#9e9d24", // Encabezado verde
          color: "#000000", // Texto blanco en el encabezado
        },
        "& .MuiDataGrid-cell": {
          borderRight: "1px solid #e0e0e0", // Bordes suaves entre celdas
          borderBottom: "1px solid #e0e0e0", // Bordes suaves entre filas
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: "#ffffff", // Footer verde
          color: "#fff", // Texto blanco en el footer
        },
        "& .fila-par": {
          backgroundColor: "#edffee", // Color de fondo para filas pares
        },
        "& .fila-impar": {
          backgroundColor: "#ffffff", // Color de fondo para filas impares
        },
      }}
    >
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        editMode="row"
        getRowId={(row) => row.id}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0
            ? "fila-par"
            : "fila-impar"
        }
        sx={{
          minWidth: "100%",
          overflow: "hidden",
        }}
        localeText={esLocaleText} // Aplicar el idioma en español
      />
    </Box>
  );
}
