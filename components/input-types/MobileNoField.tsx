import { Color } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import styles from "./style";

export interface MobileNoFieldProps {
  name: string;
  placeholder?: string;
  showError?: boolean;
  errorMessage?: string;
  onFocus?: () => void;
  label?: string;
  get: (path: string) => any;
  set: (path: string, value: any) => void;
}

const MobileNoField: React.FC<MobileNoFieldProps> = ({
  name,
  placeholder,
  showError = false,
  errorMessage = "",
  onFocus,
  label,
  get,
  set,
}) => {
  const [focused, setFocused] = useState(false);
  const [mobileNoError, setMobileNoError] = useState<string>("");

  const committedValue = get(name);
  const [inputValue, setInputValue] = useState(
    committedValue?.toString() ?? ""
  );

  useEffect(() => {
    setInputValue(committedValue?.toString() ?? "");
  }, [committedValue]);

  const validateMobileNumber = (number: string) => {
    if (!number) return "";

    const trimmedNumber = number.replace(/\s+/g, "");
    const isValid =
      /^09\d{9}$/.test(trimmedNumber) || /^\+639\d{9}$/.test(trimmedNumber);

    return isValid ? "" : "Invalid Mobile Number!";
  };

  const handleChange = (text: string) => {
    setInputValue(text);

    const trimmed = text.replace(/\s+/g, "");
    if (/^09\d{9}$/.test(trimmed) || /^\+639\d{9}$/.test(trimmed)) {
      set(name, trimmed);
    } else {
      set(name, null);
    }
  };

  const isErrored = showError && errorMessage;

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        id={name}
        label="Mobile Number"
        value={inputValue}
        placeholder="Enter your mobile number"
        keyboardType="phone-pad"
        mode="outlined"
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        theme={{ colors: { onSurfaceVariant: Color.neutral_400 } }}
        activeOutlineColor={Color.neutral_500}
        style={[
          styles.fieldContainer,
          { backgroundColor: Color.white },
          /*      {
              borderColor: emailError
                ? "red"
                : focused
                ? Color.primary_400
                : Color.neutral_600,
            }, */
        ]}
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

export default MobileNoField;
