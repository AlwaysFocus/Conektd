import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

const GenerateNumberBetween = (min: number, max: number, excluded: number): any => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === excluded) {
        return GenerateNumberBetween(min, max, excluded);
    }

    return randomNumber;
}

const GameScreen = (props: any) => {
    const [currentGuess, setCurrentGuess] = useState(GenerateNumberBetween(1, 100, props.userChoice));

    return (
        <View>
            
        </View>
    );
}

const styles = StyleSheet.create({

});

export default GameScreen;