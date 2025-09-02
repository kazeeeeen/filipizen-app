import ScreenLayout from "@/components/screen-layout";
import Button2 from "@/components/ui/buttons/Button2";
import Description from "@/components/ui/description";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import ImageCompress from "@/libs/ImageCompress";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const UploadID = () => {
  const [uploadedFrontImageUri, setUploadedFrontImageUri] = useState<
    string | null
  >(null);
  const [uploadedBackImageUri, setUploadedBackImageUri] = useState<
    string | null
  >(null);

  const pickImage = async (type: "front" | "back") => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets.length > 0) {
      const { uri, width, height } = pickerResult.assets[0];

      const compressedResult = await ImageCompress(uri, { width, height });

      if (compressedResult && compressedResult.uri) {
        if (type === "front") {
          setUploadedFrontImageUri(compressedResult.uri);
        } else {
          setUploadedBackImageUri(compressedResult.uri);
        }
        console.log(
          "Compressed Image Base64 Length:",
          compressedResult.base64?.length || 0
        );
      }
    }
  };
  return (
    <ScreenLayout
      header={
        <>
          <Header title="Upload ID" backHandler={true} />
          <Description text="Please have your PRC ID attach for verification." />
        </>
      }
      footer={
        <View
          style={{
            alignItems: "center",
            marginTop: hp("1%"),
            marginBottom: hp("1%"),
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button2
            name={"Next"}
            mode="contained"
            color={Color.primary_400}
            onPress={() => {
              Alert.alert(
                "Confirmation",
                "Are you sure you want to submit?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      router.push("/screens/credentials/ReviewInformation");
                    },
                  },
                ],
                { cancelable: true }
              );
            }}
          />
        </View>
      }
    >
      <View>
        <View style={{ paddingHorizontal: hp("4%"), paddingTop: hp("3%") }}>
          <Text
            style={{ fontFamily: font.intermedium, color: Color.neutral_400 }}
          >
            Front Image:
          </Text>
        </View>
        <View style={{ alignItems: "center", paddingVertical: hp("1.5%") }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: hp("25%"),
              width: wp("85%"),
              borderWidth: 1,
              borderColor: Color.primary_400,
              borderRadius: wp("2%"),
              marginBottom: hp("2%"),
            }}
          >
            {uploadedFrontImageUri ? (
              <Image
                source={{
                  uri: uploadedFrontImageUri || "",
                }}
                style={{
                  width: wp("83%"),
                  height: hp("24%"),
                  borderRadius: wp("2%"),
                }}
                resizeMode="cover"
              />
            ) : (
              <Pressable
                onPress={() => pickImage("front")}
                style={{
                  flexDirection: "row",
                  gap: wp("1%"),
                  alignItems: "center",
                }}
              >
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={Color.primary_400}
                />
                <Text>Front ID</Text>
              </Pressable>
            )}
          </View>
        </View>
        <View style={{ paddingHorizontal: hp("4%"), paddingTop: hp("3%") }}>
          <Text
            style={{ fontFamily: font.intermedium, color: Color.neutral_400 }}
          >
            Back Image:
          </Text>
        </View>
        <View style={{ alignItems: "center", paddingVertical: hp("1.5%") }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: hp("25%"),
              width: wp("85%"),
              borderWidth: 1,
              borderColor: Color.primary_400,
              borderRadius: wp("2%"),
              marginBottom: hp("2%"),
            }}
          >
            {uploadedBackImageUri ? (
              <Image
                source={{
                  uri: uploadedBackImageUri || "",
                }}
                style={{
                  width: wp("83%"),
                  height: hp("24%"),
                  borderRadius: wp("2%"),
                }}
                resizeMode="cover"
              />
            ) : (
              <Pressable
                onPress={() => pickImage("back")}
                style={{
                  flexDirection: "row",
                  gap: wp("1%"),
                  alignItems: "center",
                }}
              >
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={Color.primary_400}
                />
                <Text>Back ID</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default UploadID;
