import React, { useState } from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet
} from 'react-native';

const Card = ({ card }) => {
    const [value, setValue]  = useState(false);

    return (
        <View style={styles.container}>
            <Text>{value ? card.answer : card.question}</Text>

            <Button
                title={value ? 'Question' : 'Answer'}
                color="red"
                onPress={() => setValue(!value)}
            />
        </View>
    );
}

export default Card;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
