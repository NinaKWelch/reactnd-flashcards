import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Card from './Card';

const Quiz = ({ route }) => {
    const { questions } = route.params;

    const [score, setScore] = useState(0);
    const [index, setIndex] = useState(0);
    const [card, setCard] = useState(null);

    useEffect(() => {
        const firstCard = questions[0];
        setCard(firstCard);
    }, [])

    const changeCard = () => {
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
        return (
            <View>
                <Text>Your Score: {score}</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>{index + 1} / {questions.length}</Text>

            <Card card={card} />

            <Button
                title="Correct"
                color="green"
                onPress={() => addToScore(true)}
            />

            <Button
                title="Inorrect"
                color="red"
                onPress={() => addToScore(false)}
            />
        </View>
    );
}

export default Quiz;
