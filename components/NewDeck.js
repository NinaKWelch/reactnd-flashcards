import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import { saveDeckTitle } from '../utils/decks';
import { addDeck } from '../actions';

const NewDeck = (props) => {
  const { titles, navigation } = props;
  const [title, setTitle] = useState('');

  const createNewDeck = () => {
    // check no deck with the same title exists
    if (titles.includes(title) === false) {
      const newDeck = {
        [title]: {
          title,
          questions: [],
        },
      };

      // add deck to local storage
      saveDeckTitle(title);

      // dispatch deck to store
      props.addDeck(newDeck);

      navigation.navigate('Deck', {
        itemId: title,
      });
    } else {
      Alert.alert(
        'Change Your Title',
        'You already have a deck by this name.',
      );
    }

    setTitle('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        What is the title of your deck?
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        maxLength={35}
      />

      <Button
        title="Create Deck"
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
};

const mapStateToProps = (decks) => ({
  titles: decks === null ? [] : Object.keys(decks),
});

export default connect(mapStateToProps, { addDeck })(NewDeck);

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
});
