"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import tokenLoginUser from "./token";
import { useProduct } from "@/provider/ProviderContext";
import LoadingSJL from "@/components/loading/LoadingSJL";
import dataApi from "@/data/fetchData";
import { getAllDocumentsSection } from "@/redux/documents/actions";
import { useDispatch } from "react-redux";

const withAuth = (WrappedComponent, requiredRole) => {
  const ComponentWithAuth = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { setUser, setAllUser, setDocumentSection } = useProduct();

    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // Si no hay token, redirigir y no hacer nada más
        setIsLoading(false); //prueba
        router.push("/");
        return;
      }

      try {
        const userData = await tokenLoginUser(token);

        if (!userData || userData.message === "Unauthorized") {
          localStorage.removeItem("token");
          router.push("/");
          setIsLoading(false); //prueba
          return;
        }

        const allUsers = await dataApi.getAllUser(token);
        const document = await dataApi.sectionDocument(token);
        dispatch(getAllDocumentsSection({token:token}));
        setDocumentSection(document);
        setAllUser(allUsers);
        setUser(userData);

        // Controlador de roles
        if (requiredRole && userData.roles[0] !== requiredRole) {
          router.push("/");
          setIsLoading(false); //prueba
          return;
        }
      } catch (error) {
        console.error("Error durante la verificación del token:", error);
        localStorage.removeItem("token"); // Remover el token en caso de error
        router.push("/");
      } finally {
        setIsLoading(false); // Finalizar el estado de carga
      }
    };

    useEffect(() => {
      checkAuth(); // Ejecutar la verificación de autenticación al montar
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Solo necesita ejecutarse una vez al montar router, setDocumentSection, setUser

    if (isLoading) {
      return <LoadingSJL />; // Mostrar cargando mientras se verifica la autenticación
    }

    return <WrappedComponent {...props} />; // Si está autenticado, renderiza el componente envuelto
  };

  ComponentWithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
};

export default withAuth;
