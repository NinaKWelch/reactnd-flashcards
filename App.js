import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import reducer from './reducers';
import Nav from './components/Nav';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import Score from './components/Score';
import NewCard from './components/NewCard';

const App = () => {
  enableScreens();
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={createStore(reducer)}>
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
            name="Score"
            component={Score}
          />

          <Stack.Screen
            name="NewCard"
            component={NewCard}
            options={{ title: 'New Card' }}
          />       
        </Stack.Navigator>
      </NavigationContainer>
    </Provider> 
  );
}

export default App;