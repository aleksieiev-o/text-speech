import { Dispatch, SetStateAction, useState } from 'react';

interface UseLoading {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const useLoading = (): UseLoading => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading,
    setIsLoading,
  };
};
