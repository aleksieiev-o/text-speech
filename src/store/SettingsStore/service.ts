import { ref, set, get, child, DataSnapshot } from 'firebase/database';
import { Locale, Settings, SettingsStore, Theme } from './index';
import { firebaseDataBase } from '../../firebase';

interface ISettingsStoreService {
  settingsStore: SettingsStore;
  loadSettings: () => Promise<Settings>;
  updateLocale: (locale: Locale) => Promise<Locale>;
  updateTheme: (theme: Theme) => Promise<Theme>;
  updatePreviewText: (previewText: boolean) => Promise<boolean>;
}

export class SettingsStoreService implements ISettingsStoreService {
  settingsStore: SettingsStore;

  constructor(settingsStore: SettingsStore) {
    this.settingsStore = settingsStore;
  }

  async loadSettings(): Promise<Settings> {
    const locale = await this.loadLocalOnce();
    const theme = await this.loadThemeOnce();
    const hidePreviewText = await this.loadPreviewTextOnce();

    return Promise.resolve({ locale, theme, hidePreviewText });
  }

  async updateLocale(locale: Locale): Promise<Locale> {
    await set(ref(firebaseDataBase, this.settingsStore.localePath), locale);
    return await this.loadLocalOnce();
  }

  async updateTheme(theme: Theme): Promise<Theme> {
    await set(ref(firebaseDataBase, this.settingsStore.themePath), theme);
    return await this.loadThemeOnce();
  }

  async updatePreviewText(hidePreviewText: boolean): Promise<boolean> {
    await set(ref(firebaseDataBase, this.settingsStore.previewTextPath), hidePreviewText);
    return await this.loadPreviewTextOnce();
  }

  private async loadLocalOnce(): Promise<Locale> {
    const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), this.settingsStore.localePath));
    // TODO complete the check
    // if (snapshot.exists()) {
    //   return snapshot.val();
    // }
    return snapshot.val();
  }

  private async loadThemeOnce(): Promise<Theme> {
    const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), this.settingsStore.themePath));
    // TODO complete the check
    // if (snapshot.exists()) {
    //   return snapshot.val();
    // }
    return snapshot.val();
  }

  private async loadPreviewTextOnce(): Promise<boolean> {
    const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), this.settingsStore.previewTextPath));
    // TODO complete the check
    // if (snapshot.exists()) {
    //   return snapshot.val();
    // }
    return snapshot.val();
  }
}
