import React from "react";
import { Button } from "@mantine/core";

const ButtonFollow = ({ handleFunction = () => {}, color, text,confirmar = false,allTrue }) => {
  return (
    <>
    {!confirmar && <Button onClick={handleFunction} className="self-end" color={color}>
      {text}
    </Button>}
    {confirmar && <Button disabled={!allTrue} onClick={handleFunction} className="self-end" color={color}>
      {text}
    </Button>}
    </>
  );
};

export default ButtonFollow;
