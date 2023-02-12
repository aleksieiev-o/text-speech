import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export const useCurrentCollectionId = () => {
  const { pathname } = useLocation();
  return useMemo(() => pathname.split('/')[2], [pathname]);
};
