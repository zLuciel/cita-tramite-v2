"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientData } from "@/redux/user/actions";
import LoadingSJL from "@/components/loading/LoadingSJL";

function Page() {
  const dataClient = {
    dni: "76735911",
    password: "Madara18",
  };

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.UserClientRedux
  );

  useEffect(() => {
    dispatch(fetchClientData(dataClient));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (loading) {
    return <LoadingSJL />;
  }
  return (
    <div>
      <h1>{data?.email} </h1>
    </div>
  );
}

export default Page;
