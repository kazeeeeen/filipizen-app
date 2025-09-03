/* eslint-disable @typescript-eslint/no-unused-vars */
import { Color } from "@/constants/Colors";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import styles from "./style";

export interface EmailFieldProps {
  name: string;
  placeholder?: string;
  showError?: boolean;
  errorMessage?: string;
  keyboardType?: string;
  onFocus?: () => void;
  label?: string;
  get: (path: string) => any;
  set: (path: string, value: any) => void;
  noSpace?: boolean;
}
const EmailField: React.FC<EmailFieldProps> = ({
  name,
  showError = false,
  errorMessage = "",
  onFocus,
  get,
  set,
  noSpace = false,
}) => {
  const [focused, setFocused] = useState(false);
  const value = get(name) ?? "";

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const handleChange = (text: string) => {
    let input = text;
    if (noSpace) input = input.replace(/\s+/g, "");
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
        label="Email Address"
        placeholder="Enter your Email Address"
        keyboardType="email-address"
        onChangeText={handleChange}
        mode="outlined"
        theme={{ colors: { onSurfaceVariant: Color.neutral_400 } }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        activeOutlineColor={Color.neutral_500}
        style={[styles.fieldContainer, { backgroundColor: Color.white }]}
        outlineStyle={{
          ...styles.outline,
          borderWidth: focused ? 1.5 : 1,
          borderColor: focused ? Color.primary_400 : Color.neutral_25,
        }}
      />
      {isErrored && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default EmailField;
