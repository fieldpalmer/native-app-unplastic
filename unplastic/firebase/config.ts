import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
     apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
     authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
     projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
     storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

// Explicitly type auth as Auth | undefined
let auth: Auth | undefined;

if (Platform.OS === 'web') {
     auth = getAuth(app); // web handles persistence by default
} else {
     const { getReactNativePersistence } = require('firebase/auth/react-native');
     const AsyncStorage = require('@react-native-async-storage/async-storage').default;

     auth = initializeAuth(app, {
          persistence: getReactNativePersistence(AsyncStorage)
     });
}

export { auth };
export const db = getFirestore(app);
