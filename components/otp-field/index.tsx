import React, { useEffect, useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import styled from "styled-components/native";
import styles from "./style";

export const OTPInput = styled.View`
  background-color: white;
  border-color: #cccbc9;
  border-width: 1px;
  min-width: 14%;
  border-radius: 10px;
  padding: 14px;
`;

export const OTPInputText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: black;
`;

export const OTPInputFocused = styled(OTPInput)`
  border-color: #f2bb4e;
  border-width: 2px;
`;

type OtpFieldProps = {
  setPinReady: (ready: boolean) => void;
  code: string;
  setCode: (code: string) => void;
  maxLength: number;
};

export const OtpField = ({
  setPinReady,
  code,
  setCode,
  maxLength,
}: OtpFieldProps) => {
  const codeDigitsArray = new Array(maxLength).fill(0);

  //reference for text input field
  const textInputRef = useRef<TextInput>(null);

  //monitoring input focus
  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    textInputRef?.current?.focus();
  };

  const handleOnBlur = () => {
    setInputContainerIsFocused(false);
  };

  useEffect(() => {
    // update pin ready value
    setPinReady(code.length === maxLength);
    return () => setPinReady(false);
  }, [code]);

  const toCodeDigitInput = (_value: any, index: any) => {
    //function to handle the mapping and return the box for each ticket
    const emptyInputChar = " ";
    const digit = code[index] || emptyInputChar;

    //formatting
    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const StyledOTPInput =
      inputContainerIsFocused && isDigitFocused ? OTPInputFocused : OTPInput;

    return (
      <StyledOTPInput key={index}>
        <OTPInputText>{digit}</OTPInputText>
      </StyledOTPInput>
    );
  };

  return (
    //{/* Mapping through the regular inputs and display each box(input) */}
    <View style={styles.OTPInputSection}>
      <Pressable style={styles.OTPInputContainer} onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </Pressable>
      <TextInput
        style={styles.hiddenTextInput}
        value={code}
        onChangeText={setCode}
        maxLength={maxLength}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        ref={textInputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
};
