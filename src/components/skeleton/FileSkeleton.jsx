import { Skeleton } from '@mantine/core';

  function FileSkeleton() {
    return (
      <div className='flex flex-col gap-3'>
      <div>
        <Skeleton height={15} mt={6} width="50%"/>
        <Skeleton height={25}  mt={6}/>
      </div>
        

      <div>
        <Skeleton height={15} mt={6} width="50%"/>
        <Skeleton height={25}  mt={6}/>
      </div>

      <div>
        <Skeleton height={15} mt={6} width="50%"/>
        <Skeleton height={25}  mt={6}/>
      </div>
      </div>
    );
  }

  export default FileSkeleton;