import React, { useState, useEffect } from 'react';
import { getDecks } from '../utils/api';
import { View, FlatList, Text, StyleSheet, PickerIOSItem } from 'react-native';
import DeckListItem from './DeckListItem';

const DeckList = ({ navigation }) => {
    const [decks, setDecks] = useState(null);
    console.log('DECKS: ', decks)
  
    const getDataFromStorage = async () => {
      const data = await getDecks();
      setDecks(data);
    };
  
    useEffect(() => {
      getDataFromStorage();
    }, [])

    const renderitem = ({ item }) => (
        <DeckListItem deck={item} navigation={navigation} />
    );

    return (
        <View style={styles.container}>
            {!decks ? (
                <Text>No Decks</Text>
            ) : (
                <FlatList
                    data={Object.keys(decks).map(deck => decks[deck])}
                    renderItem={renderitem}
                    keyExtractor={item => item.title}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
})

export default DeckList;