import ScreenLayout from "@/components/screen-layout";
import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { Images } from "@/constants/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Button2 from "@/components/ui/buttons/Button2";
import Header from "@/components/ui/header";

const SuccessfulMessage = () => {
  const handleData = async () => {
    await AsyncStorage.setItem("showDummyCredential", "true");
    router.push("/(tabs)/(credential-screen)");
  };
  return (
    <ScreenLayout
      header={<Header title="Message" backHandler={true} />}
      scrollable={false}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: hp("24%"),
        }}
      >
        <Image
          source={Images.check}
          style={{ width: hp("8%"), height: hp("8%") }}
        />

        <Text
          style={{
            color: Color.neutral_600,
            fontFamily: font.intermedium,
            fontSize: wp("6%"),
            marginTop: hp("1%"),
          }}
        >
          Submitted Successfully!
        </Text>
        <Text
          style={{
            color: Color.neutral_500,
            fontFamily: font.interregular,
            fontSize: wp("3.5%"),
            marginTop: hp("1%"),

            textAlign: "center",
            paddingHorizontal: wp("2%"),
          }}
        >
          Form submitted successfully. Please allow up to 1-2 days for the
          approval of your application.
        </Text>
      </View>
      <View>
        <Button2
          name={"Go back to credential screen"}
          onPress={handleData}
          mode={"text"}
        />
      </View>
    </ScreenLayout>
  );
};

export default SuccessfulMessage;
