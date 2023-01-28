import { AuthorizationStore, IAuthorizationStore } from './AuthorizationStore';
import { SettingsStore } from './SettingsStore';

interface IRootStore {
  authorizationStore: IAuthorizationStore;
}

export class RootStore implements IRootStore {
  authorizationStore: AuthorizationStore;
  settingsStore: SettingsStore;

  constructor() {
    this.authorizationStore = new AuthorizationStore();
    this.settingsStore = new SettingsStore();
  }
}
