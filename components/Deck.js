import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const Deck = ({ route, navigation }) => {
    const { itemId } = route.params;
    const { deck } = route.params;
    console.log('DECKID: ', itemId)
    console.log('DECK: ', deck)

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{deck.title}</Text>
            <Text>{deck.questions.length} Cards</Text>
            <Button title="Add Card" />
            <Button title="Start Quiz" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    text: {
        color: 'blue',
    },
})

export default Deck;