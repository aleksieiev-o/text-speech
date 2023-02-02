import { User } from '@firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import { AuthorizationStore, AuthRequestDto } from './index';

interface IAuthorizationStoreService {
  authorizationStore: AuthorizationStore;
  signInEmailPassword: (payload: AuthRequestDto) => Promise<User>;
  singUpEmailAndPassword: (payload: AuthRequestDto) => Promise<User>;
  singOutEmailAndPassword: () => Promise<void>;
}

export class AuthorizationStoreService implements IAuthorizationStoreService {
  authorizationStore: AuthorizationStore;

  constructor(authorizationStore: AuthorizationStore) {
    this.authorizationStore = authorizationStore;
  }

  async signInEmailPassword(payload: AuthRequestDto): Promise<User> {
    const { email, password } = payload;
    const userCredential: UserCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential.user;
  }

  async singUpEmailAndPassword(payload: AuthRequestDto): Promise<User> {
    const { email, password } = payload;
    const userCredential: UserCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential.user;
  }

  async singOutEmailAndPassword(): Promise<void> {
    return await signOut(firebaseAuth);
  }
}
