import React from "react";
import { Pressable, Text, View } from "react-native";

import { font } from "@/constants/Fonts";
import buttonStyles from "./style";

export type buttonProperties = {
  buttonName: string;
  buttonColor: string;
  buttonNameColor: string;
  buttonLayout: object;
  disabled?: boolean;
  onPress(): any;
};

const Button: React.FC<buttonProperties> = ({
  buttonName,
  buttonColor,
  buttonNameColor,
  buttonLayout,
  disabled,
  onPress,
}) => {
  return (
    <View>
      <Pressable
        style={{
          ...buttonStyles.container,
          ...buttonLayout,
          backgroundColor: buttonColor,
        }}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={{
            color: buttonNameColor,
            fontFamily: font.intermedium,
            fontSize: 15,
          }}
        >
          {buttonName}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;
