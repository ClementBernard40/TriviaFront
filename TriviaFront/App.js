import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import QuestionScreen from "./screens/QuestionScreen";
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Acceuil" 
          component={HomeScreen}
          options={{
            title: 'Acceuil',
            headerStyle: {
              backgroundColor: '#ba0d7b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          
        />
        <Stack.Screen 
          name="Question" 
          component={QuestionScreen}
          options={{
            title: 'Question',
            headerStyle: {
              backgroundColor: '#ba0d7b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <FontAwesome name="angle-left" size={24} color="#fff" style={{ marginLeft: 10 }} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
