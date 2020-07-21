import React from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    StyleSheet
} from 'react-native';

const DeckListItem = ({ deck, navigation }) => {
    const { questions } = deck;

    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            style={styles.row}
            onPress={() => {
                navigation.navigate('Deck', {
                    itemId: deck.title,
                    deck,
                });
            }}
        >
            <View>
                <Text style={styles.text}>{deck.title}</Text>

                <Text>
                    {questions.length} {questions.length === 1 ? 'Card' : 'Cards'}
                </Text>
            </View>
        </TouchableHighlight>
    );
}

export default DeckListItem;

const styles = StyleSheet.create({
    row: {
        padding: 15,
        marginBottom: 5,
    },
})
