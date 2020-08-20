import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

const Deck = (props) => {
  const { navigation, deck } = props;
  const { questions, title } = deck;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.text}>
          {`${questions.length} ${questions.length === 1 ? 'Card' : 'Cards'}`}
        </Text>
      </View>

      <View>
        <Button
          title="Add Card"
          color="orange"
          onPress={() => {
            navigation.navigate('NewCard', {
              itemId: title,
            });
          }}
        />

        <Button
          title="Start Quiz"
          disabled={deck.questions.length === 0}
          onPress={() => {
            navigation.navigate('Quiz', {
              itemId: title,
              questions,
            });
          }}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (decks, { route }) => {
  const id = route.params.itemId;

  return {
    deck: decks[id],
  };
};

export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  content: {
    paddingTop: 30,
  },
  title: {
    marginBottom: 15,
    fontSize: 22,
    fontWeight: '500',
    color: 'purple',
  },
  text: {
    fontSize: 16,
  },
});
