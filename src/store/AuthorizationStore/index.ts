import { action, makeAutoObservable } from 'mobx';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import { User } from '@firebase/auth';
import { AuthorizationStoreService } from './service';

export interface IAuthorizationStore {
  authorizationStoreService: AuthorizationStoreService;
  user: User;
}

export class AuthorizationStore implements IAuthorizationStore {
  authorizationStoreService: AuthorizationStoreService = {} as AuthorizationStoreService;
  user = {} as User;

  constructor() {
    this.authorizationStoreService = new AuthorizationStoreService();
    makeAutoObservable(this);

    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        this.setUser(user);
      }
    });
  }

  @action
  async signInEmailPassword(email: string, password: string) {
    const user = await this.authorizationStoreService.signInEmailPassword(email, password);
    this.setUser(user);
  }

  @action
  async singUpEmailAndPassword(email: string, password: string) {
    const user = await this.authorizationStoreService.singUpEmailAndPassword(email, password);
    this.setUser(user);
  }

  @action
  private setUser(user: User) {
    this.user = user;
  }
}
