import * as React from "react";
import Box from "@mui/material/Box";
import { IoEyeSharp } from "react-icons/io5";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";


export default function TableNoCita({ allUser }) {
  const [rows, setRows] = React.useState([]);

  const router = useRouter()
  // Estado para almacenar los IDs seleccionados
  
  React.useEffect(() => {
    if (allUser) {
      const transformedRows = allUser.map((appointment,key) => ({
        idIndex:key,
        id: appointment.user.id,
        dni: appointment.user.dni,
        firstName: appointment.user.firstName.toUpperCase(),
        lastName: appointment.user.lastName.toUpperCase(),
        mobileNumber: appointment.user.mobileNumber,
        email: appointment.user.email,
        appointmentDate: appointment.user.birthDate.split("T")[0].split("-").reverse().join("/"),
        sectionId: appointment.section.id,
        slug: appointment.section.sectionSlug,
        // reservedById: appointment.reservedBy.id,
        sectionName: appointment.section.sectionName,
        // timeCita: `${appointment.schedule.startTime} - ${appointment.schedule.endTime}`,
      }));
      setRows(transformedRows);
    }
  }, [allUser]);
 
  const handleInformationClick = (sectionId, reservedById,slug) => () => {
    // router.push(`/dashboard/revision/${slug}/${reservedById}?id=${sectionId}&email=email`)
    router.push(`/dashboard/${slug}-nuevos/${sectionId}?idCita=${reservedById}&citapendiente=true`)
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Ver usuario",
      cellClassName: "actions",
      getActions: ({ id, row }) => [
        <GridActionsCellItem
          key={id}
          icon={<IoEyeSharp />}
          label="Información"
          onClick={handleInformationClick(row.sectionId, row.id,row.slug,)}
        />,
      ],
    },
    { field: "dni", headerName: "DNI", width: 150, editable: false },
    { field: "firstName", headerName: "Nombres", width: 150, editable: false },
    { field: "lastName", headerName: "Apellidos", width: 150, editable: false },
    {
      field: "sectionName",
      headerName: "Sección de documento",
      width: 150,
      editable: false,
    },
    {
      field: "appointmentDate",
      headerName: "Fecha de Nacimiento",
      width: 150,
      editable: false,
    },

    {
      field: "mobileNumber",
      headerName: "Teléfono",
      width: 150,
      editable: false,
    },
    { field: "email", headerName: "Gmail", width: 200, editable: false },
  ];

  return (
    <>
      <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          editMode="row"
          getRowId={(row) => row.idIndex}
          sx={{ minWidth: "100%", overflow: "hidden" }}
        />
      </Box>
    </>
  );
}
