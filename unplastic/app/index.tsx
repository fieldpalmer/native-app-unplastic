import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const ACTIONS = [
     { icon: '🚫🥤', label: 'Refused Straw' },
     { icon: '🛍️', label: 'Used Tote Bag' },
     { icon: '🧴', label: 'Refilled Bottle' },
     { icon: '📦', label: 'Bought Bulk' },
     { icon: '🧼', label: 'Used Bar Soap' },
     { icon: '🍅', label: 'Bought Produce Naked' }
];

export default function LogScreen() {
     const handleLog = async (label: string) => {
          try {
               await addDoc(collection(db, 'logs'), {
                    action: label,
                    timestamp: Date.now()
               });
               alert(`✅ Logged: ${label}`);
          } catch (err) {
               console.error(err);
               alert('Failed to log action');
          }
     };

     return (
          <View style={styles.container}>
               <Text style={styles.header}>Log Plastic-Free Action</Text>
               <FlatList
                    data={ACTIONS}
                    keyExtractor={(item) => item.label}
                    numColumns={2}
                    contentContainerStyle={styles.grid}
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
     container: {
          flex: 1,
          paddingTop: 60,
          paddingHorizontal: 16,
          backgroundColor: '#f0fdf4'
     },
     header: {
          fontSize: 22,
          fontWeight: '600',
          marginBottom: 24,
          textAlign: 'center',
          color: '#065f46'
     },
     grid: {
          gap: 12
     },
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
     icon: {
          fontSize: 36
     },
     label: {
          fontSize: 14,
          marginTop: 8,
          textAlign: 'center',
          color: '#065f46'
     }
});
