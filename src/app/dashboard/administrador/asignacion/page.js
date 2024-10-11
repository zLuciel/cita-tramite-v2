"use client";
import withAuth from "@/auth/withAuth";
import Movil from "@/components/header/Movil";
import TableAsignacion from "@/dashboard/components/tableUser/TableAsignacion";
import { useProduct } from "@/provider/ProviderContext";
import { getAllPlataform } from "@/redux/dashboard/actions";
import { Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IoReloadCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const { user } = useProduct();
  const [refresh, setRefresh] = useState(false);
  const { allDocumets } = useSelector((state) => state.DocumentsGlobalRedux);
  const { allTablePlataform } = useSelector(
    (state) => state.DashboarAdmidRedux
  );

  const [dataSelect, setDataSelect] = useState([]);

  useEffect(() => {
    const dataSection = allDocumets.map((section) => ({
      value: section.sectionId,
      label: `${section.sectionName}`,
    }));
    setDataSelect(dataSection);
    dispatch(getAllPlataform({ token: user.token }));
  }, [allDocumets, dispatch, user.token, refresh]);
  return (
    <div>
      {<Movil role={"administrator"} />}
      <main className="bg-white p-10 main-admi relative">
        <div className="flex gap-4 justify-between mb-4">
          <h1 className="text-2xl mb-3 font-bold uppercase">
            Tabla de Asignaciónes
          </h1>
          <Button
            variant="gradient"
            gradient={{ from: "violet", to: "indigo", deg: 90 }}
            onClick={() => setRefresh(!refresh)}
          >
            ACTUALIZAR LISTA
          </Button>
        </div>
        <div>
          <TableAsignacion
            allUser={allTablePlataform}
            dataSelect={dataSelect}
          />
        </div>
      </main>
    </div>
  );
};

export default withAuth(Page, "administrator");
