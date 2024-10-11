// app/auth/verify-email/page.jsx
import React, { Suspense } from "react";

import LoadingSJL from "@/components/loading/LoadingSJL";
import ResetPassword from "./ResetPassword";


const Page = () => {
  return (
    <Suspense fallback={<LoadingSJL />}>
     <ResetPassword/>
    </Suspense>
  );
};

export default Page;