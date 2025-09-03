import ScreenLayout from "@/components/screen-layout";
import Button2 from "@/components/ui/buttons/Button2";
import Description from "@/components/ui/description";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { Alert, Dimensions, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const FaceCapture = () => {
  return (
    <ScreenLayout
      header={
        <>
          <Header title="Face Capture" backHandler={true} />
          <Description text="Capture your face for authentication purposes." />
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
      <View></View>
    </ScreenLayout>
  );
};

export default FaceCapture;
