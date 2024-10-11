import { Skeleton } from '@mantine/core';

  function CardSkeletonCita() {
    return (
      <div className='container-card px-8 py-6 flex flex-col justify-center items-center' >
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="350px" radius="xl" />
      </div>
    );
  }

  export default CardSkeletonCita;