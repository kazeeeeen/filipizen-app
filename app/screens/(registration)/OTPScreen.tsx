import { OtpField } from "@/components/otp-field";
import ScreenLayout from "@/components/screen-layout";
import Button2 from "@/components/ui/buttons/Button2";
import Description from "@/components/ui/description";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import styles from "./style";

export interface OTPScreenProps {
  handleCodeChange: (code: string) => void;
  sendOTPCodeHandler: () => void;
  code: string;
  otpError?: string;
  showResendButton: boolean;
  MAX_CODE_LENGTH: number;
}

const OTPScreen = () => {
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [otpError, setOtpError] = useState("");
  const MAX_CODE_LENGTH = 6;

  const router = useRouter();
  const params = useLocalSearchParams();
  const { otp } = params;

  const [timer, setTimer] = useState(120);

  const handleCodeChange = (newCode: any) => {
    setCode(newCode);
    setOtpError("");
  };

  /*   useEffect(() => {
    if (code.length === MAX_CODE_LENGTH) {
      verifyOtp();
    }
  }, [code]); */

  /*   const verifyOtp = async () => {
    if (code === otp) {
      console.log("Success");
    } else {
      setOtpError("Incorrect OTP. Please try again.");
      setCode("");
    }
  }; */

  const handleResendOTP = async () => {
    // sendOTPCodeHandler();
    setTimer(120);
  };

  return (
    <ScreenLayout
      header={
        <View>
          <Header title="Authentication" backHandler={true} />
          <Description text="A One-Time Password will be received on the email address you have registered." />
        </View>
      }
      footer={
        <View
          style={{
            alignItems: "center",
            marginTop: hp("1%"),
            marginBottom: hp("1%"),
            justifyContent: "center",
          }}
        >
          <Button2
            name={"Next"}
            mode="contained"
            color={Color.primary_400}
            onPress={() => {
              router.push("/screens/CreateMPINScreen");
            }}
          />
        </View>
      }
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.inputFieldsContainer}>
          <OtpField
            code={code}
            setCode={handleCodeChange}
            maxLength={MAX_CODE_LENGTH}
            setPinReady={setPinReady}
          />
          <View style={styles.otpPhrase}>
            {otpError && <Text style={styles.textError}>{otpError}</Text>}

            <Pressable onPress={handleResendOTP} disabled={timer > 0}>
              <Text
                style={{
                  fontSize: 13,
                  color: timer > 0 ? Color.neutral_400 : Color.primary_400,
                  fontFamily: font.interregular,
                  textDecorationLine: "underline",
                  textDecorationColor:
                    timer > 0 ? Color.neutral_300 : Color.primary_400,
                }}
              >
                {`Resend OTP ${timer > 0 ? `in ${timer}s` : ""}`}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default OTPScreen;
