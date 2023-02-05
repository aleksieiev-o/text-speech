import { AuthorizationStore, IAuthorizationStore } from './AuthorizationStore';
import { SettingsStore } from './SettingsStore';
import { CollectionsStore } from './CollectionsStore';
import { CardsStore } from './CardsStore';

interface IRootStore {
  authorizationStore: IAuthorizationStore;
  settingsStore: SettingsStore;
  collectionsStore: CollectionsStore;
  cardsStore: CardsStore;
}

export class RootStore implements IRootStore {
  authorizationStore: AuthorizationStore;
  settingsStore: SettingsStore;
  collectionsStore: CollectionsStore;
  cardsStore: CardsStore;

  constructor() {
    this.authorizationStore = new AuthorizationStore(this);
    this.settingsStore = new SettingsStore(this);
    this.collectionsStore = new CollectionsStore(this);
    this.cardsStore = new CardsStore(this);
  }
}
