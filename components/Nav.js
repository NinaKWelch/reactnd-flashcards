import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeckList from './DeckList';
import NewDeck from './NewDeck';

const Nav = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Decks" component={DeckList} />
            <Tab.Screen name="New Deck" component={NewDeck} />
        </Tab.Navigator>
    );
}


export default Nav;