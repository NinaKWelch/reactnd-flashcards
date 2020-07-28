import React from 'react'
import { Text, View } from 'react-native'

const Score = ({ score }) => (
    <View>
        <Text>Your Score: {score}</Text>
    </View>
)

export default Score;
