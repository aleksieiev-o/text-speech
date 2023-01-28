import { makeAutoObservable } from 'mobx';
import { settingsStoreService } from './service';

export enum Locale {
  EN_US = 'en-us',
  RU_RU = 'ru_ru',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface Settings {
  locale: Locale;
  theme: Theme;
}

export interface ISettingsStore {
  locale: Locale;
  theme: Theme;
  loadSettings: () => void;
  updateLocale: (locale: Locale) => void;
  updateTheme: (theme: Theme) => void;
}

export class SettingsStore implements ISettingsStore {
  locale: Locale = Locale.EN_US;
  theme: Theme = Theme.LIGHT;

  constructor() {
    makeAutoObservable(this);
    this.loadSettings();
  }

  async loadSettings() {
    try {
      const settings = await settingsStoreService.loadSettings();
      this.locale = settings.locale;
      this.theme = settings.theme;
    } catch (e) {
      console.warn(e);
    }
  }

  async updateLocale(locale: Locale) {
    this.locale = await settingsStoreService.updateLocale(locale);
  }

  async updateTheme(theme: Theme) {
    this.theme = await settingsStoreService.updateTheme(theme);
  }
}
