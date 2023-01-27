import React, { createContext, FC, ReactElement } from 'react';
import { RootStore } from '../store';
import { useStore } from '../store/hooks';

interface Props {
  children: ReactElement;
}

export const StoreContext = createContext<RootStore>(new RootStore());

const StoreContextProvider: FC<Props> = ({children}): ReactElement => {
  const rootStore = useStore();

  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
