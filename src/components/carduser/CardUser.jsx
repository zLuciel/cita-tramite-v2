"use client";
import Image from "next/image";
import {
  LiaBirthdayCakeSolid,
  LiaDigitalTachographSolid,
} from "react-icons/lia";
import sjl from "@/assets/sjl.png";
import { MdOutgoingMail } from "react-icons/md";
import { PiArchiveFill } from "react-icons/pi";
import { IoMdCall } from "react-icons/io";
import { BsFillHousesFill } from "react-icons/bs";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

function CardUser({ dataUser, slug, idSection, nuevo, pendiente }) {
  const router = useRouter();

  const handleDocumentUser = () => {
    // router.push(`/dashboard/${slug}/${dataUser[0].id}?id=${idSection}`);
    if (nuevo) {
      router.push(`/dashboard/${slug}/${idSection}?nuevo=true`);
    }
    if (pendiente) {
      router.push(`/dashboard/${slug}/${idSection}?pendiente=true`);
    }
  };

  return (
    <div className="">
      <Button
        // disabled={!dataUser.length validar despues}
        onClick={handleDocumentUser}
        color="green"
        rightSection={<PiArchiveFill style={{ color: "white" }} size={14} />}
      >
        VER DOCUMENTOS
      </Button>
    </div>
  );
}

export default CardUser;
