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
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import { Select, CheckIcon, ChevronDownIcon } from "native-base";

import { Endpoint, Method } from "../Interfaces/Endpoint";
import { Property } from "../Interfaces/Property";
import { DataObject } from "../Interfaces/DataObject";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/Colors";

import Get from "../API/Get";
import DataObjectInput from "../components/DataObjectInput";
import EndpointCard from "../components/EndpointCard";

const HomeScreen = () => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [newEndpoint, setNewEndpoint] = useState<Endpoint>({
    Id: Math.random(),
    Name: '',
    APIKey: "",
    URI: "",
    DataObject: { Properties: Array<Property>() },
    Method: Method.GET,
  });
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [isAddingDataObject, setIsAddingDataObject] = useState(false);

  // For testing requests - remove later
  const [requestData, setRequestData] = useState("");

  // State for the new endpoint being added
  const [URI, setURI] = useState("");
  const [APIKey, setAPIKey] = useState("");
  const [dataObject, setDataObject] = useState<DataObject>({
    Properties: Array<Property>(),
  });
  const [endpointMethod, setEndpointMethod] = useState<Method>(Method.GET);
  const [endpointName, setEndpointName] = useState('');

  const URIInputHandler = (URI: string) => {
    setURI(URI);
  };

  const APIKeyInputHandler = (APIKey: string) => {
    setAPIKey(APIKey);
  };

  const endpointNameHandler = (endpointName: string) => {
    setEndpointName(endpointName);
  }

  const resetInputHandler = () => {
    setConfirmed(false);
    setAPIKey("");
    setURI("");
    setEndpointName("");
    setNewEndpoint({
      Id: Math.random(),
      Name: '',
      APIKey: "",
      URI: "",
      DataObject: { Properties: Array<Property>() },
      Method: Method.GET,
    });
    // Remove this later, currently used to quickly clear all endpoints
    //setEndpoints([]);
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

  const confirmEndpointHandler = () => {
    //TODO: Add error checking to make sure the endpoint will be valid
    // Perhaps a "Test connection" button

    setConfirmed(true);

    newEndpoint.URI = URI;
    newEndpoint.APIKey = APIKey;
    newEndpoint.Method = endpointMethod;
    newEndpoint.DataObject = dataObject;
    newEndpoint.Name = endpointName;

    if (endpoints.length < 1) return;

    addEndpointHandler();

    Keyboard.dismiss();
  };

  const addEndpointHandler = () => {
     // If we were to use setEndpoints([...endpoints, endpoint]), we may not be guaranteed
    // to get the most up to date list of goals so instead we use the following syntax
    // using the anonymous function guarantees that we have the most up to date list of endpoints
    setEndpoints((currentEndpoints) => [
      ...currentEndpoints,
      {
        Id: Math.random(),
        Name: newEndpoint.Name,
        URI: newEndpoint.URI,
        APIKey: newEndpoint.APIKey,
        Method: newEndpoint.Method,
        DataObject: newEndpoint.DataObject,
      },
    ]);
    resetInputHandler();
  }

  const onAddDataObject = (dataObject: DataObject) => {};

  const handleMethodChange = (method: string) => {
    switch (method) {
      case "GET":
        setEndpointMethod(Method.GET);
        return;
      case "POST":
        setEndpointMethod(Method.POST);
        return;
      case "PATCH":
        setEndpointMethod(Method.PATCH);
        return;
      case "DELETE":
        setEndpointMethod(Method.DELETE);
        return;
    }
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <View style={styles.confirmedOutputContainer}>
        <Text style={styles.title}>Confirm Endpoint Info</Text>
        <Text style={styles.newEndpoint}>{`Endpoint URI: ${newEndpoint.URI}`}</Text>
        <View style={styles.button}>
          <Button
            color={Colors.darkSecondary}
            title="Add Endpoint"
            onPress={addEndpointHandler}
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
        <DataObjectInput
          onAddDataObject={onAddDataObject}
          visible={isAddingDataObject}
          onCancel={() => {
            setIsAddingDataObject(false);
          }}
        />
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
            onChangeText={endpointNameHandler}
            value={endpointName}
            placeholder="Name"
          />
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
          {/* <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            maxLength={100}
            onChangeText={APIKeyInputHandler}
            value={APIKey}
            placeholder="API Key"
          /> */}
          <Text style={styles.title}>Method</Text>
          <View style={styles.selectContainer}>
            <Select
              style={styles.selectMethod}
              selectedValue={endpointMethod}
              minWidth="80%"
              accessibilityLabel="Choose Method"
              placeholder="Choose Method"
              dropdownIcon={<ChevronDownIcon />}
              _selectedItem={{
                bg: Colors.darkSecondary,
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={handleMethodChange}
            >
              <Select.Item key="GET" label="GET" value="GET" />
              <Select.Item key="POST" label="POST" value="POST" />
              <Select.Item key="PATCH" label="PATCH" value="PATCH" />
              <Select.Item key="DELETE" label="DELETE" value="DELETE" />
            </Select>
          </View>

          <Pressable
            style={{ ...styles.button, ...styles.dataObject }}
            onPress={() => setIsAddingDataObject(true)}
          >
            <Text style={styles.dataObjectText}>Define Data Object</Text>
          </Pressable>

          <View style={styles.buttonContainer}>
            <View style={styles.cancelButton}>
              <Button
                color={Colors.primary}
                title="Reset"
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                color={Colors.darkSecondary}
                title="Add"
                onPress={confirmEndpointHandler}
              />
            </View>
            {/* <View style={styles.button}>
              <Button
                color={Colors.darkSecondary}
                title="Get Data"
                onPress={getDataHandler}
              />
            </View> */}
          </View>
        </Card>
        {confirmedOutput}
        <FlatList
        // This allows us to configure which value is used as the key from our object array
        style={styles.endpointList}
        keyExtractor={(item, index) => item.Id}
        data={endpoints}
        renderItem={(endpoint: any) => (
          <EndpointCard
            endpoint={endpoint.item}
          />
        )}
        // style={styles.goalsList}
      />
      
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
  dataObject: {
    marginVertical: 15,
    height: 45,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
  dataObjectText: {
    fontSize: 20,
    color: Colors.secondary,
  },
  selectContainer: {
    maxWidth: "60%",
    alignItems: "center",
  },
  selectMethod: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  endpointList: {
    marginVertical: 20,
    width: 300,
    maxWidth: "80%",
    height: 200,
  }
});

export default HomeScreen;
