import React from "react";
import { Text, View } from "react-native";
import styles from "./style";

interface Props {
  text: string;
}

const Description: React.FC<Props> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Description;
