import { Color } from "@/constants/Colors";
import React, { useState } from "react";
import { Keyboard, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput } from "react-native-paper";
import styles from "./style";

export interface DateFieldProps {
  name: string;
  placeholder?: string;
  showError?: boolean;
  errorMessage?: string;
  showIcon?: boolean;
  onFocus?: () => void;
  label?: string;
  get: (path: string) => any;
  set: (path: string, value: any) => void;
}

const DateField: React.FC<DateFieldProps> = ({
  name,
  placeholder,
  showError = false,
  errorMessage = "",
  showIcon = false,
  onFocus,
  label,
  get,
  set,
}) => {
  const [focused, setFocused] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const value = get(name) ?? "";

  const handleChange = (text: string) => {
    let input = text;
    set(name, input);
  };

  const showDatePicker = () => {
    Keyboard.dismiss();
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const handleConfirm = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    set(name, formattedDate);
    hideDatePicker();
  };
  const isErrored = showError && errorMessage;
  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          onPress={showDatePicker}
          id={name}
          label={label}
          value={value}
          placeholder={placeholder}
          mode="outlined"
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

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default DateField;
