import ScreenLayout from "@/components/screen-layout";
import Button2 from "@/components/ui/buttons/Button2";
import { Color } from "@/constants/Colors";
import { Images } from "@/constants/Images";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import styles from "./style";

const OnboardingScreen = () => {
  return (
    <ScreenLayout
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
            name={"Create an Account"}
            mode="contained"
            color={Color.primary_400}
            onPress={() => {
              router.push("/screens/PersonalInfoScreen");
            }}
          />
        </View>
      }
    >
      <View style={styles.container}>
        <View>
          <Image source={Images.onBoarding} style={styles.imageLayout} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.textHeader}>All in one app</Text>
          <Text style={styles.textBody}>
            Experience ease of doing business with the government.
          </Text>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default OnboardingScreen;
