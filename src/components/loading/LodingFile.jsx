import { Loader } from '@mantine/core';

function LodingFile({seguimiento}) {
  //header-file-seguimiento
  const heigthHeader = seguimiento ? "header-file-seguimiento" : "header-file-normal"
  return (
    <div className={`absolute ${heigthHeader} flex items-center justify-center z-10 loadingFile`}>
        <Loader size={49} color="red" />
    </div>
  );
}

export default LodingFile