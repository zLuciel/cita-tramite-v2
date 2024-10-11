import { Button } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const LinkFollow = ({ idDocument, sectionSlug }) => {
  return (
    <>
      { (
        <>
          Gracias por registrarse.{" "}
          <Link
            href={`/tramite/seguimiento-${sectionSlug}?id=${idDocument}`}
            className="font-bold"
          >
            <Button
              rightSection={<IoIosArrowDroprightCircle size={20} />}
              variant="gradient"
              gradient={{ from: "lime", to: "green", deg: 90 }}
            >
              SEGUIMIENTO AQUI
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default LinkFollow;
