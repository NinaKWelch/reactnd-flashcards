import React, { useState, useEffect } from 'react';
import {
    getLocalNotification,
    clearLocalNotification,
    setLocalNotification } from '../utils/notifications';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet } from 'react-native';
import Card from './Card';
import Score from './Score';

const Quiz = ({ route }) => {
    const { questions } = route.params;
    const today = new Date().getDate();

    const [day, setDay] = useState(0);
    const [score, setScore] = useState(0);
    const [index, setIndex] = useState(0);
    const [card, setCard] = useState(null);
   
    // get the date of next scheduled notification
    const getNotificationDate = async () => {
        const date = await getLocalNotification();
        date !== null ? setDay(date) : null;
    }

    useEffect(() => {
        // show the first card in the deck
        const firstCard = questions[index];
        setCard(firstCard);

        getNotificationDate();
    }, [])

    // clear notifications before rescheduling
    const clearNotifications = async () => {
        await clearLocalNotification();
    }

    // reschedule notification
    const setNewNotification = async () => {
        await setLocalNotification();
    }
   
    const changeCard = () => {
        const i = index + 1;
        const newCard = questions[i]

        // check if scheduled notification date
        // is the current date
        if (day === today) {
            clearNotifications();
            setNewNotification();
        }

        // show the next card in the deck
        setIndex(i);
        setCard(newCard);
    }

    const addToScore = (value) => {
        // add a point to the score
        // if user answered correctly
        if (value) {
            setScore(score + 1);
        }
        
        // move to the next card
        changeCard();
    }

    const resetQuiz = () => {
        setScore(0);
        setIndex(0);
        setCard(questions[0]);
    }

    if (!card) {
        return (
            <Score
                score={(score/questions.length * 100).toFixed(0)}
                handleResetQuiz={resetQuiz}
            />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>{index + 1} / {questions.length}</Text>
            </View>

            <Card card={card} />

            <View style={styles.content}>
                <TouchableOpacity
                    style={[styles.button, styles.greenButton]}
                    onPress={() => addToScore(true)}
                >
                    <Text style={[styles.text, styles.whiteText]}>
                        Correct
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.redButton]}
                    onPress={() => addToScore(false)}
                >
                    <Text style={[styles.text, styles.whiteText]}>
                        Incorrect
                    </Text>
                </TouchableOpacity>
            </View> 
        </View>
    );
}

export default Quiz;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    content: {
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        marginBottom: 15,
        borderWidth: 2,
        paddingHorizontal: 50,
        paddingVertical: 10,
    },
    greenButton: {
        borderColor: 'green',
        backgroundColor: 'green',
    },
    redButton: {
        borderColor: 'red',
        backgroundColor: 'red',
    },
    whiteText: {
        color: 'white',
    }
})
