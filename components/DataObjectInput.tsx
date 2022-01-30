import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet, Modal, Text } from "react-native";
import Colors from "../constants/Colors";

import { DataObject } from "../Interfaces/DataObject";
import { Property } from "../Interfaces/Property";

interface Props {
  onAddDataObject: (dataObject: DataObject) => void;
  onCancel: () => void;
  visible: boolean;
}

const DataObjectInput = (props: Props) => {
  const [dataObject, setDataObject] = useState<DataObject>({
    Properties: Array<Property>(),
  });
  const [properties, setProperties] = useState<Property[]>();
  const [property, setProperty] = useState<Property>({
    Id: Math.random(),
    Key: "",
    Value: "",
    Type: "",
  });

  const addDataObject = () => {
    props.onAddDataObject(dataObject);
  };

  const updatePropertyKey = (propertyKey: string) => {
    // Using an anonymous function here guarantees we have the most up to date value
    // for our Property object
    setProperty((currentPropertyValues) => ({
      ...currentPropertyValues,
      Key: propertyKey,
    }));
  };
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
          {/* Display the beginning of our object structure */}
        <View>
          <Text>{"{"}</Text>
        </View>
        {/* Display the properties that have been added to the dataObject so far */}
        <View>
            
        </View>
        <TextInput
          placeholder="Key"
          value={property?.Key}
          style={styles.input}
          onChangeText={updatePropertyKey}
        />
        <TextInput
          placeholder="Key"
          value={property?.Key}
          style={styles.input}
          onChangeText={updatePropertyKey}
        />
        <View>
          <Text>{"}"}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {/* // We can use the .bind method on the function passed from the parent
          // to pre-configure some arguments that will eventually be passed when
          // the function is called */}
          <Button
            title="CANCEL"
            color={Colors.primary}
            onPress={props.onCancel}
          />
          <Button
            color={Colors.darkSecondary}
            title="ADD"
            onPress={
              // This calls a function that will trigger the function passed from the parent
              // in our props
              addDataObject
            }
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-evenly",
  },
  button: {},
});

export default DataObjectInput;
