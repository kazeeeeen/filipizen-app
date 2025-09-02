import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export type buttonProps = {
  name: string;
  color?: string;
  disabled?: boolean;
  textColor?: string;
  icon?: boolean;
  mode?: "text" | "outlined" | "contained" | "contained-tonal";
  onPress(): any;
};

const Button2: React.FC<buttonProps> = ({
  name,
  color,
  disabled,
  textColor,
  icon,
  mode,
  onPress,
}) => {
  const isContained = mode === "contained" || mode === "contained-tonal";
  const isText = mode === "text";
  return (
    <Button
      onPress={onPress}
      disabled={disabled}
      rippleColor={mode === "text" ? "transparent" : undefined}
      buttonColor={isContained ? Color.primary_400 : isText ? color : undefined}
      textColor={
        isContained
          ? Color.white
          : isText
          ? textColor ?? Color.neutral_600
          : Color.neutral_600
      }
      mode={mode}
      style={
        isContained
          ? { ...styles.buttonLayout, backgroundColor: color }
          : undefined
      }
      contentStyle={{
        justifyContent: "center",
        height: hp("6%"),
      }}
      labelStyle={{
        fontFamily: font.intermedium,
        fontSize: 16,
      }}
    >
      {name}
    </Button>
  );
};

export default Button2;

const styles = StyleSheet.create({
  buttonLayout: {
    width: wp("90%"),
    height: hp("6%"),
    borderRadius: wp("8%"),
  },
});
