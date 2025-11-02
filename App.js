import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator InitialRouteName="HomeScreen">
        <Stack.screen name="HomeScreen" component="HomeScreen"/>
        <Stack.screen name="AlunoEditorScreen" component="AlunoEditorScreen"/>
        <Stack.screen name="AlunoListScreen" component="AlunoListScreen"/>
      </Stack.Navigator>
    </NavigationContainer>


  )
}

