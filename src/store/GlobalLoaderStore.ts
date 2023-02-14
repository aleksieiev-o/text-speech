import { makeAutoObservable } from 'mobx';

interface IGlobalLoaderStore {
  isGlobalLoading: boolean;
  setGlobalLoading: (isLoading: boolean) => void;
}

export class GlobalLoaderStore implements IGlobalLoaderStore {
  isGlobalLoading: boolean;

  constructor() {
    this.isGlobalLoading = true;

    makeAutoObservable(this);
  }

  setGlobalLoading(isLoading: boolean) {
    this.isGlobalLoading = isLoading;
  }
}
