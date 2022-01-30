import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Box, VStack, Divider } from 'native-base';

import Get from '../API/Get';
import { Endpoint } from '../Interfaces/Endpoint';
import Card from './Card';


// interface Props {
//     endpoint: Endpoint
// }

const EndpointCard = (props: any) => {
    const [endpointData, setEndpointData] = useState({});

    const handleRetrieveData = async () => {
        const data = await Get(props.endpoint);
        setEndpointData(data);
    }

    return (
        <TouchableOpacity onPress={handleRetrieveData}>
        <Card style={styles.cardContainer}>
            <Text style={styles.title}>{props.endpoint.Name}</Text>
            <View>
                <Text>
                    {JSON.stringify(endpointData)}
                </Text>
            </View>
        </Card>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    cardContainer: {
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {

    }
});

export default EndpointCard;