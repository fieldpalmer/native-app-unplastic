import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { signIn, signUp } from '../firebase/auth';

export default function LoginScreen() {
     const [email, setEmail] = useState('');
     const [pw, setPw] = useState('');

     const handleSignIn = async () => {
          try {
               await signIn(email, pw);
               Alert.alert('Success', 'Signed in!');
          } catch (err) {
               const error = err as Error;
               Alert.alert('Error', error.message);
          }
     };

     const handleSignUp = async () => {
          try {
               await signUp(email, pw);
               Alert.alert('Success', 'Account created!');
          } catch (err) {
               const error = err as Error;
               Alert.alert('Error', error.message);
          }
     };

     return (
          <View style={styles.container}>
               <Text style={styles.title}>Unplastic Login</Text>
               <TextInput
                    placeholder='Email'
                    style={styles.input}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    onChangeText={setEmail}
               />
               <TextInput placeholder='Password' style={styles.input} secureTextEntry onChangeText={setPw} />
               <Pressable style={styles.btn} onPress={handleSignIn}>
                    <Text style={styles.btnText}>Sign In</Text>
               </Pressable>
               <Pressable style={[styles.btn, { backgroundColor: '#10b981' }]} onPress={handleSignUp}>
                    <Text style={styles.btnText}>Sign Up</Text>
               </Pressable>
          </View>
     );
}

const styles = StyleSheet.create({
     container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f0fdf4' },
     title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
     input: {
          backgroundColor: 'white',
          padding: 12,
          marginVertical: 6,
          borderRadius: 10,
          borderColor: '#ccc',
          borderWidth: 1
     },
     btn: {
          backgroundColor: '#2563eb',
          padding: 12,
          marginTop: 12,
          borderRadius: 10,
          alignItems: 'center'
     },
     btnText: { color: 'white', fontWeight: '600' }
});
