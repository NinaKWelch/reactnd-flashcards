import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { getDecks } from '../utils/decks';
import { receiveDecks } from '../actions';
import DeckListItem from './DeckListItem';

const DeckList = (props) => {
  const { decks, navigation } = props;

  const getDataFromStorage = async () => {
    // get decks from local storage
    const data = await getDecks();

    // dispatch decks to store
    props.receiveDecks(data);
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

  const renderDeck = ({ item }) => (
    <DeckListItem deck={item} navigation={navigation} />
  );

  if (!decks) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          No Decks. Add some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={Object.keys(decks).map((deck) => decks[deck])}
      renderItem={renderDeck}
      keyExtractor={(item) => item.title}
    />
  );
};

const mapStateToProps = (decks) => ({
  decks,
});

export default connect(mapStateToProps, { receiveDecks })(DeckList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});
