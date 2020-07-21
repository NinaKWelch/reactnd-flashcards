import React, { useState } from 'react';
import { addCardToDeck } from '../utils/api';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet
} from 'react-native';

const NewCard = ({ route }) => {
    const { itemId } = route.params;

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const addCard = () => {
        const card = {
            question,
            answer,
        }

        addCardToDeck(itemId, card);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>New Card</Text>

            <View>
                <Text>Add question:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={text => setQuestion(text)}
                    value={question}
                />

                <Text>Add answer:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={text => setAnswer(text)}
                    value={answer}
                />
                        
                <Button
                    onPress={addCard}
                    title="Submit"
                />
            </View>

        </View>
    );
}

export default NewCard;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    text: {
        color: 'blue',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
    },
})
