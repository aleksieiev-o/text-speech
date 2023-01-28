import { Locale, Settings, Theme } from './index';

interface ISettingsStoreService {
  loadSettings: () => Promise<Settings>,
  updateLocale: (locale: Locale) => Promise<Locale>,
  updateTheme: (theme: Theme) => Promise<Theme>,
}

class SettingsStoreService implements ISettingsStoreService {
  async loadSettings(): Promise<Settings> {
    return Promise.resolve({
      locale: Locale.EN_US,
      theme: Theme.LIGHT,
    });
  }

  async updateLocale(locale: Locale): Promise<Locale> {
    console.warn(locale);
    return Promise.resolve(Locale.EN_US);
  }

  async updateTheme(theme: Theme): Promise<Theme> {
    console.warn(theme);
    return Promise.resolve(Theme.LIGHT);
  }
}

export const settingsStoreService = new SettingsStoreService();
