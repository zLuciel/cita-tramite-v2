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

import { useQuery } from '@tanstack/react-query';

const fetchAllNewTables = async ({ token, idSection }) => {
  const url = "https://xynydxu4qi.us-east-2.awsapprunner.com";
  const response = await fetch(`${url}/api/process-status/completed-users/${idSection}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

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

// Usamos la sintaxis de objeto, que es la forma requerida a partir de React Query v5
const { data, error, isLoading } = useQuery({
  queryKey: ['fetchAllNewTables', user.token, idSection], // Clave única como array
  queryFn: () => {
    if (idSection) {
      return fetchAllNewTables({ token: user.token, idSection });
    } else if (idSectionPendiente) {
      return fetchPendingTables({ token: user.token, idSectionPendiente });
    } else if (idSectionSubPendiente) {
      return fetchSubPendingTables({ token: user.token, idSectionSubPendiente });
    }
  },
  refetchInterval: 10000, 
  onError: (error) => {
    console.error('Error fetching data:', error);
  },
  
  onSuccess: (data) => {
    console.log('Data fetched successfully:', data);
  },
});


  if (isLoading ) {
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
            allUser={data}
          />
        </div>
      </main>
    </div>
  );
};

export default withAuth(Page, "platform-operator");
