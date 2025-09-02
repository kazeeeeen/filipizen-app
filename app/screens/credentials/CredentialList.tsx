import ScreenLayout from "@/components/screen-layout";
import Button2 from "@/components/ui/buttons/Button2";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { Images } from "@/constants/Images";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const CredentialList = () => {
  const [showDummy, setShowDummy] = useState(false);

  useEffect(() => {
    const checkDummy = async () => {
      const flag = await AsyncStorage.getItem("showDummyCredential");
      setShowDummy(flag === "true");
      await AsyncStorage.removeItem("showDummyCredential");
    };
    checkDummy();
  }, []);
  const goToCredentials = () => {
    router.push("/screens/credentials/SelectCredential");
  };
  return (
    <ScreenLayout
      header={
        <View>
          <Header title="Credentials" />
        </View>
      }
    >
      <View style={styles.addButtonContainer}>
        <Button2 name={"Add"} onPress={goToCredentials} mode={"text"} />
      </View>

      <View
        style={{
          flex: 1,

          alignItems: "center",
        }}
      >
        {showDummy ? (
          <View
            style={{
              backgroundColor: "white",
              justifyContent: "center",
            }}
          >
            <Pressable
              style={{
                backgroundColor: Color.white,
                borderColor: Color.neutral_100,
                borderWidth: 1.3,
                elevation: 0.2,
                padding: 10,
                borderRadius: 8,
                marginBottom: 12,
                width: wp("90%"),
              }}
              onPress={() => {
                router.push("/screens/credentials/CredentialDetail");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: wp("2%"),
                  width: wp("90%"),
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#F8F8F8",
                    padding: wp("3%"),
                    borderRadius: 8,
                  }}
                >
                  <Image
                    source={Images.prc}
                    style={{
                      width: hp("7%"),
                      height: hp("7%"),
                    }}
                  />
                </View>
                <View style={{ marginRight: wp("32%") }}>
                  <Text
                    style={{ fontFamily: font.intersemibold, fontSize: 16 }}
                  >
                    PRC
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.interregular,
                      fontSize: 14,
                      color: "#5CE65C",
                    }}
                  >
                    Active
                  </Text>
                </View>
                <View style={{ paddingRight: wp("4%") }}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={wp("8%")}
                    color={Color.primary_400}
                  />
                </View>
              </View>
            </Pressable>
          </View>
        ) : (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={Images.nocredential}
                style={{
                  width: hp("5%"),
                  height: hp("5%"),
                  marginBottom: hp("1%"),
                }}
              />
              <Text
                style={{
                  fontFamily: font.intersemibold,
                  color: Color.neutral_600,
                  fontSize: 18,
                }}
              >
                No Credentials Found
              </Text>
              <View style={{ paddingTop: hp("1%") }}>
                <Text
                  style={{
                    color: Color.neutral_500,
                    textAlign: "center",
                    width: wp("90%"),
                  }}
                >
                  Your credential is currently empty. Once you apply, it will
                  appear here automatically.
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    </ScreenLayout>
  );
};

export default CredentialList;

const styles = StyleSheet.create({
  addButtonContainer: {
    alignItems: "flex-end",
  },
});
