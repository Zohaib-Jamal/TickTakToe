import {
  StyleSheet,
  Text,
  View,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export default function Square(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onClickProp}>
      <Text style={styles.text}>{props.valueProp}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    width: 100,
    height: 100,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 10,
  },
  text: {
    color: "black",
    textAlign: "center",
    fontSize: 50,
  },
});
