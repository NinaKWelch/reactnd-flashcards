import { AsyncStorage } from 'react-native';

// mock decks
const mockDecks = {
    React: {
        title: 'React',
        questions: [
        {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
        },
        {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
        }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
        {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
        ]
    }
}

// storage key
const DECKS_STORAGE_KEY = 'decks';

// return all of the decks along with their titles, questions, and answers
export async function getDecks() {
    try {
        const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
        return data !== null ? JSON.parse(data) : null;
    } catch(err) {
        console.log('ERROR: ', err);
    }
}

/* take in a single id argument and return the deck associated with that id
const getDeck = async (id) => {
    try {
        const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
        const deck = decks.find(id)
        return deck != null ? JSON.parse(deck) : null
    } catch(err) {
        console.log('ERROR: ', err)
    }

    console.log('Deck done.')
} */

// take in a single title argument and add it to the decks
export async function saveDeckTitle(title) {
    const newDeck = {
        title,
        questions: [] 
    };

    try {
        await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
            [title]: newDeck
        }))
    } catch(err) {
        console.log('ERROR: ', err)
    }
    
    console.log('Add Deck done.')
}

/**
 * take in two arguments, title and card,
 * and add the card to the list of questions for the deck
 * with the associated title */ 
/*const addCardToDeck = async (title, card) => {
    try {
        // TODO
    } catch(err) {
        console.log('ERROR: ', err)
    }
    
    console.log('Add Card done.')
}*/