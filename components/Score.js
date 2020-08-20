import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

const Score = ({ score, handleResetQuiz }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        {`Your Score: ${score} %`}
      </Text>

      <View>
        <Button
          title="Restart Quiz"
          color="orange"
          onPress={handleResetQuiz}
        />

        <Button
          title="Back to Deck"
          onPress={() => {
            navigation.navigate('Deck');
          }}
        />
      </View>
    </View>
  );
};

export default Score;

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
});
