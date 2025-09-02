import EmailField from "@/components/input-types/EmailField";
import MobileNoField from "@/components/input-types/MobileNoField";
import ScreenLayout from "@/components/screen-layout";
import Button2 from "@/components/ui/buttons/Button2";
import Description from "@/components/ui/description";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { useEntityState } from "@/hooks/useEntityState";
import { useAuthContext } from "@/libs/AuthContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import styles from "./style";

export const SMSApiEnv = {
  acctname: process.env.EXPO_PUBLIC_SMS_API_ACCOUNT_NAME || "",
  apikey: process.env.EXPO_PUBLIC_SMS_API_KEY || "",
};

const PersonalInfoScreen = () => {
  const [isSubmitted, setSubmitted] = useState(false);
  const [loader, setLOader] = useState<boolean>();

  const { get, set, entity } = useEntityState({
    user: {
      mobileno: "",
      email: "",
    },
  });

  const { setOtp } = useAuthContext();

  /* 
 const handleSubmit = async () => {
    setSubmitted(true);
    let isValid = true;

   
    try {
     
      setLOader(true);
     

      

      const OTP = generateOTP();
      setOtp(OTP);
      const SMSMessage = `Your OTP code is ${OTP}. Please do not share it with anyone.`;
      const SMSQueryParams = `?phoneno=${formattedMobileNo}&message=${SMSMessage}&env=${JSON.stringify(
        SMSApiEnv
      )}`;
      const SMSresult = await SmsAPI.send(SMSQueryParams);
      if (SMSresult.state === "SUCCESS") {
        setTimeout(() => {
          setLOader(false);
          router.push({
            pathname: "/OtpPage",
            params: { otp: OTP },
          });
        }, 2000);
      } else {
        console.error("SMS sending failed", SMSresult);
      }
    } catch (error) {
      alert(error);
      setTimeout(() => {
        setLOader(false);
        alert("Please check your mobile connection");
      }, 5000);
    }
  }; */

  return (
    <ScreenLayout
      header={
        <View>
          <Header title="Contact Information" backHandler={true} />
          <Description text="Please input your contact information." />
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
          <View style={styles.lowerDescription}>
            <Text style={styles.lowerText}>
              By clicking Submit, we will gather network information from your
              phone number in order to send you a One-Time Password (OTP).
            </Text>
          </View>

          <Button2
            name={"Next"}
            mode="contained"
            color={Color.primary_400}
            onPress={() => {
              router.push("/screens/OTPScreen");
            }}
          />
        </View>
      }
    >
      <View style={styles.formContainer}>
        <EmailField
          name="email"
          errorMessage="Email is required."
          get={get}
          set={set}
        />
        <MobileNoField
          label="Mobile Number"
          name="mobileno"
          errorMessage="Invalid mobile number"
          get={get}
          set={set}
        />
      </View>
    </ScreenLayout>
  );
};

export default PersonalInfoScreen;
