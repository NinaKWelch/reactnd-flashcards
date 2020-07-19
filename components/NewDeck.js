import React, { useState } from 'react';
import { saveDeckTitle } from '../utils/api';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const NewDeck = () => {
    const [title, setTitle] = useState('')
    
    const addTitle = () => {
        saveDeckTitle(title);
        setTitle('')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>New Deck</Text>
            <Text>What is the title of your deck?</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setTitle(text)}
                value={title}
            />
            <Button
                onPress={addTitle}
                title="Submit"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    text: {
        color: 'blue',
    },
    input: {
        backgroundColor: '#dcdcdc',
        padding: 10,
    },
})

export default NewDeck;