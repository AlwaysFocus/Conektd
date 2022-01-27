import React from "react";
import { View, StyleSheet} from "react-native";

import Colors from "../constants/Colors";

const Card = (props: any) => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: Colors.darkPrimary,
    elevation: 8,
    padding: 15,
    borderRadius: 10,
  },
});

export default Card;
