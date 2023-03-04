import Bowser from 'bowser';
import { GlobalLoaderStore } from './GlobalLoaderStore';
import { AuthorizationStore } from './AuthorizationStore';
import { SettingsStore } from './SettingsStore';
import { CollectionsStore } from './CollectionsStore';
import { CardsStore } from './CardsStore';

interface IRootStore {
  bowserParser: Bowser.Parser.Parser;

  globalLoaderStore: GlobalLoaderStore;
  authorizationStore: AuthorizationStore;
  settingsStore: SettingsStore;
  collectionsStore: CollectionsStore;
  cardsStore: CardsStore;
}

export class RootStore implements IRootStore {
  bowserParser: Bowser.Parser.Parser;

  globalLoaderStore: GlobalLoaderStore;

  authorizationStore: AuthorizationStore;
  settingsStore: SettingsStore;
  collectionsStore: CollectionsStore;
  cardsStore: CardsStore;

  constructor() {
    this.bowserParser = Bowser.getParser(window.navigator.userAgent);

    this.globalLoaderStore = new GlobalLoaderStore();

    this.authorizationStore = new AuthorizationStore(this);
    this.settingsStore = new SettingsStore(this);
    this.collectionsStore = new CollectionsStore(this);
    this.cardsStore = new CardsStore(this);
  }

  get bowserOs(): Bowser.Parser.OSDetails {
    return this.bowserParser.getOS();
  }

  get bowserBrowser(): Bowser.Parser.Details {
    return this.bowserParser.getBrowser();
  }

  get bowserEngine(): Bowser.Parser.Details {
    return this.bowserParser.getEngine();
  }

  get bowserPlatform(): Bowser.Parser.PlatformDetails {
    return this.bowserParser.getPlatform();
  }
}
