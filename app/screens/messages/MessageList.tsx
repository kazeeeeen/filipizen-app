import ScreenLayout from "@/components/screen-layout";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { Images } from "@/constants/Images";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import styles from "./style";

const MessageList = () => {
  function selectContactHandler(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <ScreenLayout
      header={
        <View>
          <Header title="Messages" backHandler={false} />
        </View>
      }
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={Images.nomessage}
          style={{ width: hp("4%"), height: hp("4%"), marginBottom: hp("1%") }}
        />
        <Text
          style={{
            fontFamily: font.intersemibold,
            color: Color.neutral_600,
            fontSize: 18,
          }}
        >
          No Messages Found
        </Text>
        <View style={{ paddingTop: hp("1%") }}>
          <Text
            style={{
              color: Color.neutral_500,
              textAlign: "center",
              width: wp("90%"),
            }}
          >
            Your inbox is currently empty. Once you receive a message, it will
            appear here automatically.
          </Text>
        </View>
      </View>
      <View style={styles.chatButton}>
        <Pressable onPress={selectContactHandler}>
          <MaterialIcons name="chat" size={40} color={Color.primary_400} />
        </Pressable>
      </View>
    </ScreenLayout>
  );
};

export default MessageList;
