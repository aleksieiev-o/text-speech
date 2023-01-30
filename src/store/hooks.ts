import { useContext } from 'react';
import { RootStore } from './index';
import { StoreContext } from '../Providers/StoreContext.provider';
import { AuthorizationStore } from './AuthorizationStore';
import { SettingsStore } from './SettingsStore';
import { CollectionsStore } from './CollectionsStore';

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

export const useSettingsStore = (): SettingsStore => {
  const { settingsStore } = useRootStore();
  return settingsStore;
};

export const useCollectionsStore = (): CollectionsStore => {
  const { collectionsStore } = useRootStore();
  return collectionsStore;
};
