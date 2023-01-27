import { useContext } from 'react';
import { RootStore } from './index';
import { StoreContext } from '../Providers/StoreContext.provider';
import { AuthorizationStore } from './AuthorizationStore';

export const useRootStore = (): RootStore => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within StoreContextProvider');
  }
  return context;
};

export const useAuthorizationStore = (): AuthorizationStore => {
  const { authorizationStore } = useRootStore();
  return authorizationStore;
};
