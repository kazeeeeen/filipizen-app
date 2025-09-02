import { Color } from "@/constants/Colors";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import styles from "./style";

export interface TextFieldProps {
  name: string;
  placeholder?: string;
  showError?: boolean;
  errorMessage?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  showIcon?: boolean;
  onFocus?: () => void;
  label?: string;
  get: (path: string) => any;
  set: (path: string, value: any) => void;
  noSpace?: boolean;
  maxLength?: any;
  capitalize?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  get,
  set,
  noSpace = false,
  placeholder,
  showError = false,
  errorMessage = "",
  secureTextEntry = false,
  keyboardType,
  onFocus,
  maxLength,
  capitalize = true,
}) => {
  const [focused, setFocused] = useState(false);

  const value = get(name) ?? "";

  const capitalizeWords = (text: string) =>
    text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const handleChange = (text: string) => {
    let input = text;
    if (noSpace) input = input.replace(/\s+/g, "");
    if (capitalize) input = capitalizeWords(input);
    set(name, input);
  };
  const isErrored = showError && errorMessage;

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        id={name}
        label={label}
        value={value}
        placeholder={placeholder}
        mode="outlined"
        maxLength={maxLength}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        theme={{ colors: { onSurfaceVariant: Color.neutral_400 } }}
        activeOutlineColor={Color.neutral_500}
        style={[styles.fieldContainer, { backgroundColor: Color.white }]}
        outlineStyle={[
          {
            ...styles.outline,
            borderWidth: focused ? 1.5 : 1,
            borderColor: focused ? Color.primary_400 : Color.neutral_25,
          },
        ]}
      />
      {isErrored && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default TextField;
