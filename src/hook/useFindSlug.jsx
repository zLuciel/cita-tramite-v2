import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const useFindSlug = (documentSection) => {
  const pathname = usePathname();
  const slug = pathname.split('/').pop(); // Obtén el último segmento de la URL

  const findSlug = useMemo(() => {
    return documentSection.find((data) => data.sectionSlug === slug);
  }, [documentSection, slug]);

  return findSlug;
};

export default useFindSlug;
