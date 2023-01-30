import { makeAutoObservable } from 'mobx';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import { User } from '@firebase/auth';
import { AuthorizationStoreService } from './service';
import { RootStore } from '../index';

export interface IAuthorizationStore {
  rootStore: RootStore;
  authorizationStoreService: AuthorizationStoreService;
  user: User;
  isAuth: boolean;
  signInEmailPassword: (email: string, password: string) => void;
  singUpEmailAndPassword: (email: string, password: string) => void;
  singOutEmailAndPassword: () => void;
}

export class AuthorizationStore implements IAuthorizationStore {
  rootStore: RootStore;
  authorizationStoreService: AuthorizationStoreService;
  user: User = {} as User;
  isAuth = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.authorizationStoreService = new AuthorizationStoreService(this);

    makeAutoObservable(this);

    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user && user.uid) {
        this.setUser(user);

        await this.rootStore.settingsStore.loadSettings();

        this.setAuth(true);

        await this.rootStore.collectionsStore.loadAllCollections();
      } else {
        this.resetLocalData();
      }
    });
  }

  async signInEmailPassword(email: string, password: string) {
    const user = await this.authorizationStoreService.signInEmailPassword(email, password);
    this.setUser(user);

    await this.rootStore.settingsStore.loadSettings();

    this.setAuth(true);
  }

  async singUpEmailAndPassword(email: string, password: string) {
    const user = await this.authorizationStoreService.singUpEmailAndPassword(email, password);
    this.setUser(user);

    await this.rootStore.settingsStore.setDefaultSettings();

    this.setAuth(true);
  }

  async singOutEmailAndPassword() {
    await this.authorizationStoreService.singOutEmailAndPassword();
  }

  get userUid(): string {
    return this.user.uid;
  }

  private setUser(user: User): void {
    this.user = user;
  }

  private setAuth(status: boolean): void {
    this.isAuth = status;
  }

  private resetLocalData(): void {
    this.setUser({} as User);
    this.rootStore.collectionsStore.clearLocalCollections();
    this.setAuth(false);
  }
}
