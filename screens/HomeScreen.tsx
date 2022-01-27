import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import { Endpoint, Method } from "../Interfaces/Endpoint";
import { Property } from "../Interfaces/Property";
import { DataObject } from "../Interfaces/DataObject";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/Colors";

import Get from "../API/Get";

const HomeScreen = () => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [newEndpoint, setNewEndpoint] = useState<Endpoint>({
    Id: Math.random(),
    APIKey: "",
    URI: "",
    DataObject: { Properties: Array<Property>() },
    Method: Method.GET,
  });
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);

  // For testing requests - remove later
  const [requestData, setRequestData] = useState("");

  // State for the new endpoint being added
  const [URI, setURI] = useState("");
  const [APIKey, setAPIKey] = useState("");
  const [dataObject, setDataObject] = useState<DataObject>({
    Properties: Array<Property>(),
  });

  // const numberInputHandler = (inputText: any) => {
  //   setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  // };

  const URIInputHandler = (URI: string) => {
    setURI(URI);
  };

  const APIKeyInputHandler = (APIKey: string) => {
    setAPIKey(APIKey);
  };

  const resetInputHandler = () => {
    setConfirmed(false);
    setAPIKey("");
    setURI("");
  };

  const getDataHandler = async () => {
    const response = await Get({ URI: `${URI}` });
    if (URI.length === 0) {
      setConfirmed(false);
      Alert.alert("Error", `Please enter a valid URI`, [
        { text: "OK", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    } else if (response === null) {
      setConfirmed(false);
      Alert.alert("Error", `Unable to perform request`, [
        { text: "OK", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setRequestData(JSON.stringify(response));
    setConfirmed(true);
  };

  const confirmInputHandler = () => {
    //TODO: Add error checking to make sure the endpoint will be valid
    // Perhaps a "Test connection" button
    setConfirmed(true);
    if (endpoints.length < 1) return;
    // If we were to use setEndpoints([...endpoints, endpoint]), we may not be guaranteed
    // to get the most up to date list of goals so instead we use the following syntax
    // using the anonymous function guarantees that we have the most up to date list of endpoints
    setEndpoints((currentEndpoints) => [
      ...currentEndpoints,
      {
        Id: Math.random(),
        URI: newEndpoint.URI,
        APIKey: newEndpoint.APIKey,
        Method: newEndpoint.Method,
        DataObject: newEndpoint.DataObject,
      },
    ]);

    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <View style={styles.confirmedOutputContainer}>
        <Text style={styles.title}>Here's your data</Text>
        <Text style={styles.newEndpoint}>{requestData}</Text>
        <View style={styles.button}>
          <Button
            color={Colors.darkSecondary}
            title="Add Endpoint"
            onPress={() => {}}
          />
        </View>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Enter a new Endpoint!</Text>
        <Card style={styles.card}>
          <Text style={styles.cardHeader}>
            Please enter the following information.
          </Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            maxLength={100}
            onChangeText={URIInputHandler}
            value={URI}
            placeholder="URI"
          />
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            maxLength={100}
            onChangeText={APIKeyInputHandler}
            value={APIKey}
            placeholder="API Key"
          />
          <View style={styles.buttonContainer}>
            <View style={styles.cancelButton}>
              <Button
                color={Colors.primary}
                title="Reset"
                onPress={resetInputHandler}
              />
            </View>
            {/* <View style={styles.button}>
              <Button
                color={Colors.darkSecondary}
                title="Add"
                onPress={confirmInputHandler}
              />
            </View> */}
            <View style={styles.button}>
              <Button
                color={Colors.darkSecondary}
                title="Get Data"
                onPress={getDataHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  card: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  input: {
    width: "80%",
    textAlign: "center",
    fontSize: 20,
  },
  cardHeader: {
    color: "white",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    color: Colors.darkSecondary,
  },
  button: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 6,
  },
  cancelButton: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 6,
  },
  newEndpoint: {
    marginVertical: 10,
    marginBottom: 20,
    fontSize: 20,
    color: Colors.secondary,
    fontWeight: "500",
  },
  confirmedOutputContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
    flex: 1,
  },
});

export default HomeScreen;
