import { AsyncStorage } from 'react-native';

// storage key
const DECKS_STORAGE_KEY = 'localdecks';

// return all of the decks along with their titles, questions, and answers
export async function getDecks() {
  try {
    const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    return data !== null ? JSON.parse(data) : null;
  } catch(err) {
    console.log('ERROR: ', err);
  }
}

// take in a single id argument and return the deck associated with that id
export async function getDeck(id) {
  try {
    const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    if (data !== null) {
      const decks = JSON.parse(data);
      return decks[id];
    }
  } catch(err) {
    console.log('ERROR: ', err);
  }
}

// take in a single title argument and add it to the decks
export async function saveDeckTitle(title) {
  const newDeck = {
    title,
    questions: [],
  };

  try {
    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [title]: newDeck,
    }));
  } catch(err) {
    console.log('ERROR: ', err);
  }
}

/**
 * take in two arguments, title and card,
 * and add the card to the list of questions for the deck
 * with the associated title */
export async function addCardToDeck(title, card) {
  let updatedQuestions = [];

  try {
    const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    if (data !== null) {
      const decks = JSON.parse(data);
      updatedQuestions = decks[title].questions;
    }

    updatedQuestions.push(card);

    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [title]: {
        questions: updatedQuestions,
      },
    }));
  } catch (err) {
    console.log('ERROR: ', err);
  }
}

// Empty storage if necessary
// AsyncStorage.removeItem(DECKS_STORAGE_KEY)
