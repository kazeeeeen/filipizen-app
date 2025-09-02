import TextField from "@/components/input-types/TextField";
import ScreenLayout from "@/components/screen-layout";
import Button from "@/components/ui/buttons/Button";
import Description from "@/components/ui/description";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { useEntityState } from "@/hooks/useEntityState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as React from "react";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import styles from "./style";

const CreateMPINScreen = () => {
  const { get, set } = useEntityState({
    user: {
      password: "",
      confirmpassword: "",
    },
  });

  const [checked, setChecked] = React.useState(false);
  const [loader, setLoader] = useState<boolean>();

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const registerHolder = async () => {
    const password = get("password");
    const confirmPassword = get("confirmpassword");

    if (!checked) {
      alert("You must agree to the Terms and Conditions.");
      return;
    }

    setLoader(true);
    try {
      if (password.length !== 4 || confirmPassword.length !== 4) {
        alert("MPIN must be exactly 4 digits.");
        setLoader(false);
        return;
      }

      /*   if (password === "1234") {
        alert("MPIN '1234' is not allowed. Please choose another.");
        setLoader(false);
        return;
      } */

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        setLoader(false);
        return;
      }

      await AsyncStorage.setItem("mpin", password);

      setLoader(false);
      router.replace("/screens/login");
    } catch (error) {
      alert("Error: " + error);
      setLoader(false);
    }
  };

  return (
    <ScreenLayout
      header={
        <View>
          <Header title="Create MPIN" backHandler={true} />
          <Description text="Create a 4 digit MPIN. Your MPIN serves as your password.To maintain access to security, refrain from sharing your MPIN with anyone." />
        </View>
      }
      footer={
        <View style={styles.footerContainer}>
          <View style={styles.descriptionCheckBox}>
            <View style={{ marginTop: 5 }}>
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                uncheckedColor={Color.neutral_300}
                color={Color.primary_400}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text style={styles.terms}>
                By creating an account, you agree to Filipizens
              </Text>
              <Pressable
                onPress={() =>
                  router.push("/screens/settings/TermsAndConditions")
                }
              >
                <Text style={styles.conditions}>Terms and Conditions.</Text>
              </Pressable>
            </View>
          </View>

          <Button
            buttonLayout={styles.buttonLayout}
            buttonName="Submit"
            buttonColor={Color.primary_400}
            buttonNameColor={Color.white}
            onPress={registerHolder}
          />
        </View>
      }
    >
      <View style={styles.formContainer}>
        <TextField
          label="Enter  4-digit MPIN"
          name="password"
          secureTextEntry={true}
          maxLength={4}
          keyboardType="numeric"
          get={get}
          set={set}
        />
        <TextField
          label="Confirm  4-digit MPIN"
          name="confirmpassword"
          secureTextEntry={true}
          maxLength={4}
          keyboardType="numeric"
          get={get}
          set={set}
        />
      </View>
    </ScreenLayout>
  );
};

export default CreateMPINScreen;
