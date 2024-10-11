"use client";
import withAuth from "@/auth/withAuth";
import Header from "@/components/header/Header";
import Movil from "@/components/header/Movil";
import Requisito from "@/components/requisitos/Requisito";
import Username from "@/components/username/Username";
import useFindSlug from "@/hook/useFindSlug";
import { useProduct } from "@/provider/ProviderContext";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const { user } = useProduct();
  const { allDocumets } = useSelector((state) => state.DocumentsGlobalRedux);
  const fetDataSlug = useFindSlug(allDocumets);
  const matches = useMediaQuery("(min-width: 1099px)");
  
  
  return (
    <>
      <div className="body-grid">
        {!matches && <Movil />}
        {matches && <Header />}
        <main className="bg-white w-full relative">
          {matches && (
            <Username firstName={user.firstName} lastName={user.lastName} />
          )}
          <Requisito inestadaReq={true} dataDocument={fetDataSlug} />
        </main>
      </div>
    </>
  );
};

export default withAuth(Page, "user");
