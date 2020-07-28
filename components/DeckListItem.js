import React from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    StyleSheet
} from 'react-native';

const DeckListItem = ({ deck, navigation }) => {
    const { title, questions } = deck;

    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            style={styles.row}
            onPress={() => {
                navigation.navigate('Deck', {
                    itemId: title,
                });
            }}
        >
            <View>
                <Text style={styles.title}>{title}</Text>

                <Text style={styles.text}>
                    {questions.length} {questions.length === 1 ? 'Card' : 'Cards'}
                </Text>
            </View>
        </TouchableHighlight>
    );
}

export default DeckListItem;

const styles = StyleSheet.create({
    row: {
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#DDDDDD',
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
    },
    text: {
        textAlign: 'center',
    },
})
