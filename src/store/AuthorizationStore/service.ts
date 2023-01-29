import { User } from '@firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import { AuthorizationStore } from './index';

interface IAuthorizationStoreService {
  authorizationStore: AuthorizationStore;
  signInEmailPassword: (email: string, password: string) => Promise<User>;
  singUpEmailAndPassword: (email: string, password: string) => Promise<User>;
  singOutEmailAndPassword: () => Promise<void>;
}

export class AuthorizationStoreService implements IAuthorizationStoreService {
  authorizationStore: AuthorizationStore;

  constructor(authorizationStore: AuthorizationStore) {
    this.authorizationStore = authorizationStore;
  }

  async signInEmailPassword(email: string, password: string): Promise<User> {
    const userCredential: UserCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential.user;
  }

  async singUpEmailAndPassword(email: string, password: string): Promise<User> {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential.user;
  }

  async singOutEmailAndPassword(): Promise<void> {
    return await signOut(firebaseAuth);
  }
}
