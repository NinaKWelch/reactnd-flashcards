import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Nav from './components/Nav';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import NewCard from './components/NewCard';

const App = () => {
  enableScreens();
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Nav}
          options={{ title: 'Flashcards' }}
        />

        <Stack.Screen
          name="Deck"
          component={Deck}
        />

        <Stack.Screen
          name="Quiz"
          component={Quiz}
        />

        <Stack.Screen
          name="NewCard"
          component={NewCard}
        />       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;