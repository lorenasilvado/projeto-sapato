import { Login } from "./paginaLogin";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IncluirSapato } from './incluirSapato';
import { Home } from './home';
import { Provider as PaperProvider } from 'react-native-paper';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="paginaLogin">
          <Stack.Screen name="paginaLogin" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Incluir" component={IncluirSapato} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}