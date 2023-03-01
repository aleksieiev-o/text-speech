import { RefObject, useRef } from 'react';

interface UseFocus<T> {
  elementRef:  RefObject<T>;
  setFocus: () => void;
}

export const useFocus = <T extends HTMLElement>(): UseFocus<T> => {
  const elementRef = useRef<T>(null);

  const setFocus = () => elementRef?.current?.focus?.();

  return {
    elementRef,
    setFocus,
  };
};
