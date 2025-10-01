import { Images } from "@/constants/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, BackHandler, Image, Pressable, Text, View } from "react-native";
import DialPad from "./dialpad";
import styles from "./style";

const SMSApiEnv = {
  acctname: process.env.EXPO_PUBLIC_SMS_API_ACCOUNT_NAME || "",
  apikey: process.env.EXPO_PUBLIC_SMS_API_KEY || "",
};

const pinLength = 4;
const pinSpacing = 8;
const pinSize = 12;

const LoginScreen = () => {
  const [code, setCode] = useState<number[]>([]);
  const [storedPin, setStoredPin] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [resetMpinModal, setResetMpinModal] = useState(false);

  //const { setOtp } = authContext();

  useEffect(() => {
    loadPin();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => {
        backHandler.remove();
      };
    }, [])
  );

  const loadPin = async () => {
    try {
      const storedPin = await AsyncStorage.getItem("mpin");
      if (storedPin !== null) {
        setStoredPin(storedPin);
      } else {
        console.log("No MPIN found in Async Storage");
      }
    } catch (error) {
      console.error("Error loading MPIN from SecureStore:", error);
    }
  };

  const handleDeletePress = () => {
    setCode((prevCode) => prevCode.slice(0, prevCode.length - 1));
  };

  const handleNumericPress = (item: number) => {
    const isCodeComplete = (code: number[]) => code.length === pinLength;
    setCode((prevCode) => {
      const newCode = [...prevCode, item];
      if (isCodeComplete(newCode)) {
        authenticatedPin(newCode);
      }
      return newCode;
    });
  };

  const handleDialPadPress = (item: any) => {
    if (item === "del") {
      handleDeletePress();
    } else if (typeof item === "number") {
      handleNumericPress(item);
    }
  };

  const resetMpinHandler = () => {
    setResetMpinModal(true);
  };

  const authenticatedPin = async (pin: number[]) => {
    const enteredPin = pin.join("");
    if (enteredPin === storedPin) {
      router.push("/(tabs)/(inbox-screen)");
    } else {
      setShowErrorModal(true);
      setTimeout(() => {
        setCode([]);
      }, 800);
    }
  };

  const closeResetMpinModal = () => setResetMpinModal(false);
  const closeErrorModal = () => setShowErrorModal(false);

  /*   const sendOTPHandler = async () => {
    setShowErrorModal(false);
    setResetMpinModal(false);
    const OTP = generateOTP();
    setOtp(OTP);
    const SMSMessage = `Your OTP code is ${OTP}. Please do not share it with anyone.`;
    try {
      const storedData: string | null = await AsyncStorage.getItem(
        "USER_PERSONAL_INFO"
      );
      const userContact = storedData ? JSON.parse(storedData) : null;

      const SMSQueryParams = `?phoneno=${
        userContact.mobileno
      }&message=${SMSMessage}&env=${JSON.stringify(SMSApiEnv)}`;
      await SmsAPI.send(SMSQueryParams);
      router.push({
        pathname: "/ResetAuthPages/ResetOtpPage",
        params: { otp: OTP },
      });
    } catch (e) {}
  }; */

  return (
    <View style={styles.container}>
      <Image source={Images.logo} style={styles.image} resizeMode="contain" />
      <Text style={styles.mpin}>Enter your MPIN</Text>
      <View style={styles.dialPadContainer}>
        {[...Array(pinLength).keys()].map((i) => {
          const isSelected = i < code.length;
          return (
            <View
              key={i}
              style={{
                width: pinSize,
                height: isSelected ? pinSize : 12,
                borderRadius: pinSize,
                backgroundColor: isSelected ? "#F2BB4E" : "transparent",
                borderColor: "#F2BB4E",
                borderWidth: 1,
              }}
            />
          );
        })}
      </View>
      <DialPad onPress={handleDialPadPress} />
      <Pressable onPress={resetMpinHandler}>
        <Text style={styles.forgotmpin}>Forgot MPIN?</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
