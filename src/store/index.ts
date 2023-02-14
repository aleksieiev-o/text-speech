import { AuthorizationStore } from './AuthorizationStore';
import { SettingsStore } from './SettingsStore';
import { CollectionsStore } from './CollectionsStore';
import { CardsStore } from './CardsStore';
import { GlobalLoaderStore } from './GlobalLoaderStore';

interface IRootStore {
  globalLoaderStore: GlobalLoaderStore;
  authorizationStore: AuthorizationStore;
  settingsStore: SettingsStore;
  collectionsStore: CollectionsStore;
  cardsStore: CardsStore;
}

export class RootStore implements IRootStore {
  globalLoaderStore: GlobalLoaderStore;

  authorizationStore: AuthorizationStore;
  settingsStore: SettingsStore;
  collectionsStore: CollectionsStore;
  cardsStore: CardsStore;

  constructor() {
    this.globalLoaderStore = new GlobalLoaderStore();

    this.authorizationStore = new AuthorizationStore(this);
    this.settingsStore = new SettingsStore(this);
    this.collectionsStore = new CollectionsStore(this);
    this.cardsStore = new CardsStore(this);
  }
}
