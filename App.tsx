import {Login} from "./paginaLogin";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { IncluirSapato } from './incluirSapato';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="paginaLogin">
        <Stack.Screen name="paginaLogin" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Incluir" component={IncluirSapato} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}