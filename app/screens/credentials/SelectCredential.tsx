import ScreenLayout from "@/components/screen-layout";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { Images } from "@/constants/Images";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const SelectCredential = () => {
  return (
    <ScreenLayout
      header={<Header title="Select Credential" backHandler={true} />}
    >
      <View style={{ paddingHorizontal: wp("6%"), paddingTop: hp("2%") }}>
        <Pressable
          style={{ alignSelf: "flex-start" }}
          onPress={() => {
            router.push("/screens/credentials/SelectIssuer");
          }}
        >
          <View style={styles.credentialIcons}>
            <Image
              source={Images.prc}
              style={{
                width: hp("8%"),
                height: hp("8%"),
                marginBottom: hp("1%"),
              }}
            />
            <Text
              style={{
                color: Color.neutral_400,
                marginHorizontal: hp("4%"),
                fontFamily: font.intermedium,
                fontSize: 16,
              }}
            >
              PRC
            </Text>
          </View>
        </Pressable>
      </View>
    </ScreenLayout>
  );
};

export default SelectCredential;

const styles = StyleSheet.create({
  credentialIcons: {
    // mao ni
    borderWidth: 1,
    borderColor: "#E9EAEE",
    backgroundColor: Color.white,
    flexDirection: "column",
    elevation: 0.5,
    borderRadius: 10,
    padding: hp("1%"),
    alignItems: "center",
  },
});
