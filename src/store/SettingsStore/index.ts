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
  hidePreviewText: boolean;
}

interface ISettingsStore {
  rootStore: RootStore;
  settingsStoreService: SettingsStoreService;
  locale: Locale;
  theme: Theme;
  hidePreviewText: boolean;
  loadSettings: () => void;
  updateLocale: (locale: Locale) => void;
  updateTheme: (theme: Theme) => void;
}

export class SettingsStore implements ISettingsStore {
  rootStore: RootStore;
  settingsStoreService: SettingsStoreService;
  locale: Locale = Locale.EN_US;
  theme: Theme = Theme.LIGHT;
  hidePreviewText = true;

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
      this.hidePreviewText = settings.hidePreviewText;
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

  async updatePreviewText(hidePreviewText: boolean) {
    this.hidePreviewText = await this.settingsStoreService.updatePreviewText(hidePreviewText);
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

  get previewTextPath(): string {
    return `${this.userUid}/settings/hidePreviewText`;
  }
}
