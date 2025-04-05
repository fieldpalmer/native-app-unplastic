import {
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     signInAnonymously,
     onAuthStateChanged,
     User
} from 'firebase/auth';
import { auth } from './config';

export const initAnonymousUser = async (): Promise<User> => {
     return new Promise((resolve, reject) => {
          if (!auth) {
               reject(new Error('Auth is not initialized'));
               return;
          }
          onAuthStateChanged(auth!, async (user) => {
               if (user) {
                    resolve(user);
               } else {
                    try {
                         const cred = await signInAnonymously(auth!);
                         resolve(cred.user);
                    } catch (err) {
                         reject(err);
                    }
               }
          });
     });
};

export const signUp = (email: string, password: string) => {
     if (!auth) throw new Error('Auth is not initialized');
     return createUserWithEmailAndPassword(auth!, email, password);
};

export const signIn = (email: string, password: string) => {
     if (!auth) throw new Error('Auth is not initialized');
     return signInWithEmailAndPassword(auth!, email, password);
};
