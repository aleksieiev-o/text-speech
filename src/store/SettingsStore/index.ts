import { makeAutoObservable } from 'mobx';
import { SettingsStoreService } from './service';
import { RootStore } from '../index';

export enum Locale {
  EN_US = 'en-US',
  RU_RU = 'ru-RU',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface Settings {
  locale: Locale;
  theme: Theme;
}

interface ISettingsStore {
  rootStore: RootStore;
  settingsStoreService: SettingsStoreService;
  locale: Locale;
  theme: Theme;
  loadSettings: () => void;
  updateLocale: (locale: Locale) => void;
  updateTheme: (theme: Theme) => void;
}

export class SettingsStore implements ISettingsStore {
  rootStore: RootStore;
  settingsStoreService: SettingsStoreService;
  locale: Locale = Locale.EN_US;
  theme: Theme = Theme.LIGHT;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.settingsStoreService = new SettingsStoreService(this);

    makeAutoObservable(this);
  }

  async loadSettings() {
    try {
      const settings = await this.settingsStoreService.loadSettings();
      this.locale = settings.locale;
      this.theme = settings.theme;
    } catch (e) {
      console.warn(e);
    }
  }

  async updateLocale(locale: Locale) {
    this.locale = await this.settingsStoreService.updateLocale(locale);
  }

  async updateTheme(theme: Theme) {
    this.theme = await this.settingsStoreService.updateTheme(theme);
  }

  async setDefaultSettings() {
    await this.updateLocale(Locale.EN_US);
    await this.updateTheme(Theme.LIGHT);
  }

  get userUid(): string {
    return this.rootStore.authorizationStore.userUid;
  }

  get localePath(): string {
    return `${this.userUid}/settings/locale`;
  }

  get themePath(): string {
    return `${this.userUid}/settings/theme`;
  }
}
