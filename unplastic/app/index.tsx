import { View, Text } from 'react-native';

export default function HomeScreen() {
     return (
          <View
               style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'yellow',
                    borderWidth: 5,
                    borderColor: 'red'
               }}
          >
               <Text style={{ fontSize: 24 }}>Hello Web 🌐</Text>
          </View>
     );
}
