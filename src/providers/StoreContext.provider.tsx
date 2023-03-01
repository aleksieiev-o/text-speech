import React, { createContext, FC, ReactElement } from 'react';
import { RootStore } from '../store';

interface Props {
  children: ReactElement;
}

export const StoreContext = createContext<RootStore>({} as RootStore);

const StoreContextProvider: FC<Props> = ({children}): ReactElement => {
  return (
    <StoreContext.Provider value={new RootStore()}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
