import { action, makeAutoObservable } from 'mobx';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import { User } from '@firebase/auth';
import { authorizationStoreService } from './service';

export interface IAuthorizationStore {
  user: User;
  isAuth: boolean;
}

export class AuthorizationStore implements IAuthorizationStore {
  user = {} as User;
  isAuth = false;

  constructor() {
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
    const user = await authorizationStoreService.signInEmailPassword(email, password);
    this.setUser(user);
    this.setAuth(true);
  }

  @action
  async singUpEmailAndPassword(email: string, password: string) {
    const user = await authorizationStoreService.singUpEmailAndPassword(email, password);
    this.setUser(user);
    this.setAuth(true);
  }

  @action
  async singOutEmailAndPassword() {
    await authorizationStoreService.singOutEmailAndPassword();
    this.setUser({} as User);
    this.setAuth(false);
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
