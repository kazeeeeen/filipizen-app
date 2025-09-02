import ScreenLayout from "@/components/screen-layout";
import ListItemButton from "@/components/ui/buttons/ListItemButton";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const SettingsScreen = () => {
  return (
    <ScreenLayout
      header={<Header title="Settings" backHandler={false} />}
      footer={
        <View style={{ padding: 5, paddingHorizontal: 15 }}>
          <ListItemButton
            title={"Logout"}
            icon={
              <MaterialCommunityIcons
                name="logout-variant"
                size={wp("5%")}
                color={Color.neutral_500}
              />
            }
            onPress={() => console.log("Ok")}
          />
        </View>
      }
    >
      <View style={{ padding: 5, paddingHorizontal: 15 }}>
        <ListItemButton
          title={"Contact List"}
          icon={
            <MaterialCommunityIcons
              name="contacts-outline"
              size={wp("5%")}
              color={Color.neutral_500}
            />
          }
          onPress={() => console.log("Ok")}
        />
        <ListItemButton
          title={"Manage Digital Signature"}
          icon={
            <MaterialCommunityIcons
              name="file-document-outline"
              size={wp("5%")}
              color={Color.neutral_500}
            />
          }
          onPress={() =>
            router.push("/screens/settings/ManageDigitalSignature")
          }
        />
        <ListItemButton
          title={"Terms and Conditions"}
          icon={
            <MaterialCommunityIcons
              name="shield-account-variant-outline"
              size={wp("5%")}
              color={Color.neutral_500}
            />
          }
          onPress={() => console.log("Ok")}
        />
      </View>
    </ScreenLayout>
  );
};

export default SettingsScreen;
