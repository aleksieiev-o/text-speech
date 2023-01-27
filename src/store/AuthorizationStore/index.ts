import { action, makeAutoObservable } from 'mobx';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import { User } from '@firebase/auth';
import { AuthorizationStoreService } from './service';

export interface IAuthorizationStore {
  service: AuthorizationStoreService;
  user: User;
}

export class AuthorizationStore implements IAuthorizationStore {
  service: AuthorizationStoreService = {} as AuthorizationStoreService;
  user = {} as User;

  constructor() {
    this.service = new AuthorizationStoreService();
    makeAutoObservable(this);

    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        this.setUser(user);
      }
    });
  }

  @action
  async signInEmailPassword(email: string, password: string) {
    const user = await this.service.signInEmailPassword(email, password);
    this.setUser(user);
  }

  @action
  async singUpEmailAndPassword(email: string, password: string) {
    const user = await this.service.singUpEmailAndPassword(email, password);
    this.setUser(user);
  }

  @action
  private setUser(user: User) {
    this.user = user;
  }
}
