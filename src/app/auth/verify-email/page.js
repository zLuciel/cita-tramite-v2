// app/auth/verify-email/page.jsx
import React, { Suspense } from "react";

import LoadingSJL from "@/components/loading/LoadingSJL";
import EmailVerificationWrapper from "./EmailVerificationWrapper";

const Page = () => {
  return (
    <Suspense fallback={<LoadingSJL />}>
      <EmailVerificationWrapper />
    </Suspense>
  );
};

export default Page;
