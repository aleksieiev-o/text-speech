import { useContext } from 'react';
import { RootStore } from './index';
import { StoreContext } from '../Providers/StoreContext.provider';

export const useStore = (): RootStore => useContext(StoreContext);

