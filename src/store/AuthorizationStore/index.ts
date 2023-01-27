import { makeAutoObservable } from 'mobx';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import { User } from '@firebase/auth';
import { authorizationStoreService } from './service';

export interface IAuthorizationStore {
  user: User;
  isAuth: boolean;
}

export class AuthorizationStore implements IAuthorizationStore {
  user: User = {} as User;
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

  async signInEmailPassword(email: string, password: string) {
    const user = await authorizationStoreService.signInEmailPassword(email, password);
    this.setUser(user);
    this.setAuth(true);
  }

  async singUpEmailAndPassword(email: string, password: string) {
    const user = await authorizationStoreService.singUpEmailAndPassword(email, password);
    this.setUser(user);
    this.setAuth(true);
  }

  async singOutEmailAndPassword() {
    await authorizationStoreService.singOutEmailAndPassword();
    this.setUser({} as User);
    this.setAuth(false);
  }

  private setUser(user: User): void {
    this.user = user;
  }

  private setAuth(status: boolean): void {
    this.isAuth = status;
  }
}
