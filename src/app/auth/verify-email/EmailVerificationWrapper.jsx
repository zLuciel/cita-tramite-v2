// components/EmailVerificationWrapper.jsx
"use client";
import dataApi from "@/data/fetchData";
import { Button, Loader } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsEnvelopeCheckFill } from "react-icons/bs";
import { BiSolidTimer } from "react-icons/bi";
import LoadingSJL from "@/components/loading/LoadingSJL";

const EmailVerificationWrapper = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenApiVerify = async () => {
      try {
        const resToken = await dataApi.postTokenVerifyEmail(token);
        setResponse(resToken);
      } catch (error) {
        console.error("Error verifying token:", error);
        setResponse({ statusCode: 500, message: "Error al verificar el token." });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      tokenApiVerify();
    } else {
      setLoading(false);
      setResponse({ statusCode: 400, message: "Token no proporcionado." });
    }
  }, [token]);

  if (loading) {
    return <LoadingSJL />;
  }

  return (
    <main className="flex flex-col items-center justify-center gap-5 bg-white">
      {response?.statusCode === 201 && <BsEnvelopeCheckFill className="text-[15rem] email-icon" />}
      {response?.statusCode === 401 && <BiSolidTimer className="text-[15rem] email-icon" />}
      <h1 className="text-3xl font-bold">{response?.message}</h1>
      {response?.statusCode === 201 && (
        <Button
          size="sm"
          onClick={() => router.push("/")}
          className="uppercase"
          variant="gradient"
          gradient={{ from: "green", to: "lime", deg: 90 }}
        >
          ¡Bien hecho! Accede a tu cuenta
        </Button>
      )}
    </main>
  );
};

export default EmailVerificationWrapper;
