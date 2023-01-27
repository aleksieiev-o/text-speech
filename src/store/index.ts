import { AuthorizationStore, IAuthorizationStore } from './AuthorizationStore';

export interface IRootStore {
  authorizationStore: IAuthorizationStore;
}

export class RootStore implements IRootStore {
  authorizationStore: IAuthorizationStore;

  constructor() {
    this.authorizationStore = new AuthorizationStore();
  }
}
