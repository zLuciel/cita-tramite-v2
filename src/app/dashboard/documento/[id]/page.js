"use client";
import withAuth from "@/auth/withAuth";
import CardUser from "@/components/carduser/CardUser";
import Movil from "@/components/header/Movil";
import LoadingTables from "@/components/loading/LoadingTables";
import TablesUser from "@/dashboard/components/tableUser/TableUser";
import { useProduct } from "@/provider/ProviderContext";
import { Button } from "@mantine/core";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchhAllNewTables,
  getAllPeding,
  getAllPedingUnresolved,
} from "@/redux/dashboard/actions";

const Page = ({ params }) => {
  const { user } = useProduct();
  const searchParams = useSearchParams();
  const [refresh, setRefresh] = useState(false);
  const idSection = searchParams.get("idnuevo");
  const idSectionPendiente = searchParams.get("idpendiente");
  const idSectionSubPendiente = searchParams.get("id-subpendiente");
  const nameSection = params.id;
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  //redux dispacth
  const dispatch = useDispatch();
  const { allTableSection, loading, error } = useSelector(
    (state) => state.DashboarAdmidRedux
  );

  useEffect(() => {
    if (idSection) {
      dispatch(fetchhAllNewTables({ token: user.token, idSection:idSection }));
    } else if (idSectionPendiente) {
      dispatch(getAllPeding({ token: user.token, idSection:idSectionPendiente }));
    } else if (idSectionSubPendiente) {
      dispatch(
        getAllPedingUnresolved({ token: user.token, idSection:idSectionSubPendiente })
      );
    }
  }, [
    dispatch,
    idSection,
    idSectionPendiente,
    idSectionSubPendiente,
    refresh,
    user.token,
  ]);

  if (loading) {
    return <LoadingTables />;
  }

  
  return (
    <div className="">
      {<Movil role={"super user"} />}
      <main className="flex gap-4 flex-col py-5">
        <h2 className="font-semibold uppercase text-2xl text-center">{slug}</h2>

        <div className="py-4 px-10">
          <div className="flex gap-3 items-center py-4">
            {idSection && (
              <CardUser
                idSection={idSection}
                pendiente={false}
                nuevo={true}
                slug={slug}
              />
            )}
            {idSectionPendiente && (
              <CardUser
                idSection={idSectionPendiente}
                pendiente={true}
                nuevo={false}
                slug={slug}
              />
            )}
            <Button
              variant="gradient"
              gradient={{ from: "violet", to: "indigo", deg: 90 }}
              onClick={() => setRefresh(!refresh)}
            >
              ACTUALIZAR LISTA
            </Button>
          </div>
          <TablesUser
            nameSection={nameSection}
            idSectionSubPendiente={idSectionSubPendiente}
            allUser={allTableSection}
          />
        </div>
      </main>
    </div>
  );
};

export default withAuth(Page, "platform-operator");
