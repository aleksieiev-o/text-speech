import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export const useAuthRouteCondition = () => {
  const { pathname } = useLocation();
  return useMemo(() => pathname === '/sign-in', [pathname]);
};
