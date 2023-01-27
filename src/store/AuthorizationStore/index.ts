import { action, makeAutoObservable } from 'mobx';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import { User } from '@firebase/auth';
import { AuthorizationStoreService } from './service';

export interface IAuthorizationStore {
  authorizationStoreService: AuthorizationStoreService;
  user: User;
  isAuth: boolean;
  signInEmailPassword: (email: string, password: string) => void;
  singUpEmailAndPassword: (email: string, password: string) => void;
}

export class AuthorizationStore implements IAuthorizationStore {
  authorizationStoreService: AuthorizationStoreService = {} as AuthorizationStoreService;
  user = {} as User;
  isAuth = false;

  constructor() {
    this.authorizationStoreService = new AuthorizationStoreService();
    makeAutoObservable(this);

    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        this.setUser(user);
        this.setAuth(true);
      }
    });
  }

  @action
  async signInEmailPassword(email: string, password: string) {
    const user = await this.authorizationStoreService.signInEmailPassword(email, password);
    this.setUser(user);
    this.setAuth(true);
  }

  @action
  async singUpEmailAndPassword(email: string, password: string) {
    const user = await this.authorizationStoreService.singUpEmailAndPassword(email, password);
    this.setUser(user);
    this.setAuth(true);
  }

  @action
  private setUser(user: User): void {
    this.user = user;
  }

  @action
  private setAuth(status: boolean): void {
    this.isAuth = status;
  }
}
