import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { auth } from '../firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { initAnonymousUser } from '../firebase/auth';

const ACTIONS = [
     { icon: '🚫🥤', label: 'Refused Straw' },
     { icon: '🛍️', label: 'Used Tote Bag' },
     { icon: '🧴', label: 'Refilled Bottle' },
     { icon: '📦', label: 'Bought Bulk' },
     { icon: '🧼', label: 'Used Bar Soap' },
     { icon: '🍅', label: 'Bought Produce Naked' }
];

export default function HomeScreen() {
     const [user, setUser] = useState<User | null | undefined>(undefined);
     const router = useRouter();

     useEffect(() => {
          if (!auth) {
               console.error('Auth is not initialized');
               return;
          }
          const unsubscribe = onAuthStateChanged(auth!, (u) => setUser(u ?? null));
          return unsubscribe;
     }, []);

     const handleLog = async (label: string) => {
          if (!user) return;
          await addDoc(collection(db, 'logs'), {
               action: label,
               timestamp: Date.now(),
               uid: user.uid
          });
          alert(`✅ Logged: ${label}`);
     };

     const handleGuest = async () => {
          try {
               await initAnonymousUser(); // don't manually setUser here
               // onAuthStateChanged will catch the update and re-render
          } catch (err) {
               console.error('Guest login failed', err);
          }
     };

     if (user === undefined) {
          return (
               <View style={styles.container}>
                    <ActivityIndicator size='large' color='green' />
                    <Text style={{ marginTop: 10 }}>Loading user…</Text>
               </View>
          );
     }

     if (!user) {
          return (
               <View style={styles.container}>
                    <Text style={styles.header}>Welcome to Unplastic 🌍</Text>
                    <Pressable style={styles.btn} onPress={() => router.push('/login')}>
                         <Text style={styles.btnText}>Sign In / Sign Up</Text>
                    </Pressable>
                    <Pressable style={[styles.btn, { backgroundColor: '#10b981' }]} onPress={handleGuest}>
                         <Text style={styles.btnText}>Continue as Guest</Text>
                    </Pressable>
               </View>
          );
     }

     return (
          <View style={styles.container}>
               <Text style={styles.header}>Log Plastic-Free Action</Text>
               <FlatList
                    data={ACTIONS}
                    numColumns={2}
                    contentContainerStyle={styles.grid}
                    keyExtractor={(item) => item.label}
                    renderItem={({ item }) => (
                         <Pressable style={styles.card} onPress={() => handleLog(item.label)}>
                              <Text style={styles.icon}>{item.icon}</Text>
                              <Text style={styles.label}>{item.label}</Text>
                         </Pressable>
                    )}
               />
          </View>
     );
}

const styles = StyleSheet.create({
     container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#f0fdf4' },
     header: { fontSize: 22, fontWeight: '600', marginBottom: 24, textAlign: 'center', color: '#065f46' },
     grid: { gap: 12 },
     btn: {
          backgroundColor: '#2563eb',
          paddingVertical: 12,
          paddingHorizontal: 24,
          marginVertical: 8,
          borderRadius: 12
     },
     btnText: { color: 'white', fontSize: 16, fontWeight: '600' },
     card: {
          flex: 1,
          margin: 6,
          aspectRatio: 1,
          backgroundColor: '#d1fae5',
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 12,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 6
     },
     icon: { fontSize: 36 },
     label: { fontSize: 14, marginTop: 8, textAlign: 'center', color: '#065f46' }
});
