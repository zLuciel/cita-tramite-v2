import { useState, useEffect } from "react";
import dataApi from "@/data/fetchData";

const useFilesFollow = (id, token, refresh) => {
  const [filesArray, setFilesArray] = useState([]);
  const [validCita, setValidCita] = useState([]);
  const [statusComplete, setStatusComplete] = useState({});
  const [view, setView] = useState(0);
  const [mixto, setMixto] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingFile, setLoadingFile] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      setLoadingFile(true);
      try {
        const resVeryStatus = await dataApi.getProcessFile(token, id);
        setStatusComplete(resVeryStatus);

        const data = await dataApi.getFilesUser(id, token);
        setFilesArray(data);

        const validCitaFetch = await dataApi.getValidCita(token, id);
        const veryReserva = await dataApi.verifyCita(token, id);
        setValidCita(validCitaFetch);

        if (
          statusComplete?.status === "INCOMPLETO" ||
          statusComplete?.statusCode === 404
        )
          return;

        const hasObserved = data.some((doc) => doc.status == "OBSERVADO");
        const allInProcess = data.every((doc) => doc.status == "EN PROCESO");
        const allVerified = data.every((doc) => doc.status == "VERIFICADO");

        if (hasObserved) {
          setView(1);
          setMixto(2);
        } else if (allInProcess) {
          setView(0);
          setMixto(5);
        } else if (allVerified) {
          setView(3);
        } else {
          setView(2);
          setMixto(6);
        }

        if (veryReserva.ok) setView(4);
      } finally {
        setLoading(false);
        setLoadingFile(false);
      }
    };

    fetchFile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token, refresh]);

  return { filesArray, validCita, statusComplete, view, mixto, loading, loadingFile };
};

export default useFilesFollow;
