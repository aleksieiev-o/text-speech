import { User } from '@firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';

interface IAuthorizationStoreService {
  signInEmailPassword: (email: string, password: string) => Promise<User>;
  singUpEmailAndPassword: (email: string, password: string) => Promise<User>;
  singOutEmailAndPassword: () => Promise<void>;
}

class AuthorizationStoreService implements IAuthorizationStoreService {
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

export const authorizationStoreService = new AuthorizationStoreService();
