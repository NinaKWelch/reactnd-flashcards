import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { getDeck, addCardToDeck } from '../utils/decks';
import { addCard } from '../actions';

const NewCard = (props) => {
  const { route, navigation } = props;
  const { itemId } = route.params;

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const updateDeck = async (id, card) => {
    // get deck from local storage
    const deck = await getDeck(id);

    const updatedDeck = {
      title: id,
      questions: deck.questions.concat(card),
    };

    // dispatch updated deck to store
    props.addCard(id, updatedDeck);
  };

  const createNewCard = () => {
    const newCard = {
      question,
      answer,
    };

    // add card to local storage
    addCardToDeck(itemId, newCard);

    // update store
    updateDeck(itemId, newCard);

    setQuestion('');
    setAnswer('');
    navigation.navigate('Deck', { itemId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add New Card</Text>

      <View>
        <TextInput
          style={styles.input}
          onChangeText={setQuestion}
          value={question}
          placeholder="Add question..."
          maxLength={50}
          multiline
        />

        <TextInput
          style={styles.input}
          onChangeText={setAnswer}
          value={answer}
          placeholder="Add answer..."
          maxLength={50}
          multiline
        />

        <Button
          onPress={createNewCard}
          title="Submit"
          disabled={question === '' || answer === ''}
        />
      </View>
    </View>
  );
};

export default connect(null, { addCard })(NewCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
  },
  text: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    color: 'orange',
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
  },
});
