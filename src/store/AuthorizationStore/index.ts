import { makeAutoObservable } from 'mobx';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import { User } from '@firebase/auth';
import { AuthorizationStoreService } from './service';
import { RootStore } from '../index';

export interface AuthRequestDto {
  email: string;
  password: string;
}

interface IAuthorizationStore {
  rootStore: RootStore;
  authorizationStoreService: AuthorizationStoreService;
  user: User;
  isAuth: boolean;
  signInEmailPassword: (payload: AuthRequestDto) => void;
  singUpEmailAndPassword: (payload: AuthRequestDto) => void;
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
      this.rootStore.globalLoaderStore.setGlobalLoading(true);

      if (user && user.uid) {
        this.setUser(user);

        this.setAuth(true);

        await this.rootStore.settingsStore.loadSettings();

        await this.rootStore.collectionsStore.loadAllCollections();

        this.rootStore.globalLoaderStore.setGlobalLoading(false);
      } else {
        this.resetLocalData();

        this.rootStore.globalLoaderStore.setGlobalLoading(false);
      }
    });
  }

  async signInEmailPassword(payload: AuthRequestDto) {
    const user = await this.authorizationStoreService.signInEmailPassword(payload);
    this.setUser(user);

    await this.rootStore.settingsStore.loadSettings();

    this.setAuth(true);
  }

  async singUpEmailAndPassword(payload: AuthRequestDto) {
    const user = await this.authorizationStoreService.singUpEmailAndPassword(payload);
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
