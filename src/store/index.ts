import { AuthorizationStore, IAuthorizationStore } from './AuthorizationStore';

interface IRootStore {
  authorizationStore: IAuthorizationStore;
}

export class RootStore implements IRootStore {
  authorizationStore: AuthorizationStore;

  constructor() {
    this.authorizationStore = new AuthorizationStore();
  }
}
