import { AuthorizationStore, IAuthorizationStore } from './AuthorizationStore';
import { SettingsStore } from './SettingsStore';
import { CollectionsStore } from './CollectionsStore';

interface IRootStore {
  authorizationStore: IAuthorizationStore;
  settingsStore: SettingsStore;
  collectionsStore: CollectionsStore;
}

export class RootStore implements IRootStore {
  authorizationStore: AuthorizationStore;
  settingsStore: SettingsStore;
  collectionsStore: CollectionsStore;

  constructor() {
    this.authorizationStore = new AuthorizationStore(this);
    this.settingsStore = new SettingsStore(this);
    this.collectionsStore = new CollectionsStore(this);
  }
}
