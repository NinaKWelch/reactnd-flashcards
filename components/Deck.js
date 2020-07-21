import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

const Deck = ({ route, navigation }) => {
    const { itemId } = route.params;
    const { deck } = route.params;
    const { questions, title } = deck;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>

            <Text>
                {questions.length} {questions.length === 1 ? 'Card' : 'Cards'}
            </Text>

            <Button
                title="Add Card"
                onPress={() => {
                    navigation.navigate('NewCard', {
                        itemId,
                    });
                }}
            />

            <Button
                title="Start Quiz"
                disabled={deck.questions.length === 0}
                onPress={() => {
                    navigation.navigate('Quiz', {
                        itemId,
                        questions,
                    });
                }}
            />
        </View>
    );
}

export default Deck;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    text: {
        color: 'blue',
    },
})
