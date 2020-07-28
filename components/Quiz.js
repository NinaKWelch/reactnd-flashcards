import React, { useState, useEffect } from 'react';
import {
    getLocalNotification,
    setLocalNotification,
    clearLocalNotification
} from '../utils/notifications';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Card from './Card';
import Score from './Score';

const Quiz = ({ route }) => {
    const { questions } = route.params;
    const today = new Date().getDate();

    const [day, setDay] = useState(0);
    const [score, setScore] = useState(0);
    const [index, setIndex] = useState(0);
    const [card, setCard] = useState(null);
   
    // get the day when notification was last scheduled
    const getNotificationDate = async () => {
        const date = await getLocalNotification();
        date !== null ? setDay(date) : null;
    }

    useEffect(() => {
        const firstCard = questions[0];
        setCard(firstCard);
        
        getNotificationDate();
    }, [])

    // clear current notification
    // and reschedule it for the next day
    const setNewNotification = async () => {
        await clearLocalNotification();
        await setLocalNotification();
    }
   
    const changeCard = () => {
        if (day === today) {
            setNewNotification();
        }

        const newCard = questions[index + 1]
        setCard(newCard);
    }

    const addToScore = (value) => {
        if (value) {
            setScore(score + 1);
        }
        
        setIndex(index + 1);
        changeCard();
    }

    if (!card) {
        return <Score score={score} />
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
