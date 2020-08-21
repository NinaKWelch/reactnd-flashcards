import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import reducer from './reducers';
import Nav from './components/Nav';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import NewCard from './components/NewCard';

const App = () => {
  enableScreens();
  const Stack = createNativeStackNavigator();

  // set headers for tab navigation screens
  const getHeaderTitle = (route) => {
    // set decks as default route
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Decks';
  
    switch (routeName) {
      case 'Decks':
        return 'Flashcards';
      case 'NewDeck':
        return 'New Deck';
    }
  }
  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Nav}
            options={({ route }) => ({
              headerTitle: getHeaderTitle(route),
            })}
          />

          <Stack.Screen
            name="Deck"
            component={Deck}
            options={({ navigation }) => ({
              headerLeft: () => (
                <HeaderBackButton
                  label="Decks"
                  onPress={() => navigation.navigate('Decks')}
                />
              ),
            })}
          />

          <Stack.Screen
            name="Quiz"
            component={Quiz}
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
};

export default App;
