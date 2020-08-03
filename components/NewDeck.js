import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveDeckTitle } from '../utils/decks';
import { addDeck } from '../actions';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet } from 'react-native';

const NewDeck = (props) => {
    const { navigation } = props;
    const [title, setTitle] = useState('');

    const createNewDeck = () => {
        const newDeck = {
            [title]: {
                title,
                questions: [],
            } 
        }

        // add deck to local storage
        saveDeckTitle(title);

        // dispatch deck to store
        props.addDeck(newDeck);
        
        setTitle('');
        navigation.navigate('Decks')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                What is the title of your deck?
            </Text>

            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
            />

            <Button
                title="Submit"
                onPress={createNewDeck}
                disabled={title === ''}
            />

            <Button
                title="Cancel"
                color="gray"
                onPress={() => navigation.navigate('Decks')}
            />
        </View>
    );
}

export default connect(null, { addDeck })(NewDeck);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
    },
    text: {
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white',
        padding: 10,
    },
})
