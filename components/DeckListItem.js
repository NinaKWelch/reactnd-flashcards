import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

const DeckListItem = ({ deck, navigation }) => {
    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            style={styles.row}
            onPress={() => {
                navigation.navigate('Deck', {
                    itemId: deck.title,
                    deck: deck,
                });
            }}
        >
            <View>
                <Text style={styles.text}>{deck.title}</Text>
                <Text>{deck.questions.length} cards</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    row: {
        padding: 15,
        marginBottom: 5,
    },
})

export default DeckListItem;