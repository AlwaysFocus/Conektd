import React from "react";
import { TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Input = (props: any) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 5,
    padding: 10,
    backgroundColor: Colors.background,
    color: Colors.secondary,
  },
});

export default Input;
