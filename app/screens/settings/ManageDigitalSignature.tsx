import ScreenLayout from "@/components/screen-layout";
import Button2 from "@/components/ui/buttons/Button2";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { Images } from "@/constants/Images";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ManageDigitalSignature = () => {
  const [certificate, setCertificate] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const loadCert = async () => {
      const savedCert = await AsyncStorage.getItem("installedCert");
      if (savedCert) {
        setCertificate(savedCert);
      }
    };
    loadCert();
  }, []);

  const handlePickAndInstall = async (isReplace: boolean) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.type === "cancel") return;

      console.log("Picked file:", result); // debug log

      if (!result.assets || !result.assets[0]?.uri) {
        Alert.alert("Error", "File URI is missing.");
        return;
      }

      const fileUri = result.assets[0].uri;
      const fileName = result.assets[0].name || "Unknown";

      if (await Sharing.isAvailableAsync()) {
        //await Sharing.shareAsync(fileUri);
        await AsyncStorage.setItem("installedCert", fileName);
        setCertificate(fileName);

        Alert.alert(
          "Success",
          isReplace
            ? "Certificate replaced successfully!"
            : "Certificate installed successfully!"
        );
      } else {
        Alert.alert("Error", "Sharing not available on this device.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  const handleRemove = async () => {
    await AsyncStorage.removeItem("installedCert");
    setCertificate(null);
    setIsUnlocked(false);
    Alert.alert("Removed", "Certificate has been removed.");
  };

  return (
    <ScreenLayout
      header={<Header title="Manage Digital Signature" backHandler={true} />}
    >
      <View style={{ flex: 1 }}>
        {!certificate ? (
          // ------------------- EMPTY STATE -------------------
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <Image
              source={Images.signature}
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
              No Digital Signature Found
            </Text>
            <Text
              style={{
                color: Color.neutral_500,
                textAlign: "center",
                width: wp("90%"),
              }}
            >
              Digital Signature is currently empty. Once installed, it will
              appear here automatically.
            </Text>
            <Button2
              name="Install"
              mode="text"
              //color={Color.primary_400}
              onPress={() => handlePickAndInstall(false)}
            />
          </View>
        ) : (
          // ------------------- INSTALLED CERTIFICATE -------------------
          <>
            <View style={{ paddingHorizontal: 25 }}>
              <View style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/*      <View
                    style={{
                      backgroundColor: "#DCFCE7",
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="certificate-outline"
                      size={20}
                      color="#3b6048ff"
                    />
                  </View> */}
                  <Text
                    style={{
                      fontFamily: font.intersemibold,
                      fontSize: 18,
                      color: Color.primary_400,
                    }}
                  >
                    Installed Certificate
                  </Text>
                  <View>
                    {certificate && (
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => setIsUnlocked(!isUnlocked)}
                        >
                          <MaterialCommunityIcons
                            name={isUnlocked ? "lock-open-variant" : "lock"}
                            size={20}
                            color={isUnlocked ? "#16A34A" : "#666"}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            marginLeft: 8,
                            fontFamily: font.intermedium,
                            color: Color.neutral_600,
                          }}
                        >
                          {isUnlocked ? "Unlocked" : "Locked"}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <Text
                  style={{
                    marginTop: 12,
                    fontFamily: font.intermedium,
                    fontSize: 16,
                    color: Color.neutral_600,
                  }}
                >
                  {certificate}
                </Text>
                <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
                  {isUnlocked && (
                    <Pressable
                      onPress={() => handlePickAndInstall(true)}
                      style={styles.replaceBtn}
                    >
                      <Text style={styles.replaceText}>Replace</Text>
                    </Pressable>
                  )}
                  <Pressable onPress={handleRemove} style={styles.uninstallBtn}>
                    <Text style={styles.uninstallText}>Uninstall</Text>
                  </Pressable>
                </View>
              </View>
              <Text style={styles.title}>Name</Text>
              <Text style={styles.value}>Cayenne Ezra Gagno</Text>
              <View style={styles.container2}>
                <Text style={styles.title}>Issuer</Text>
                <Text style={styles.value}>Oroquieta City</Text>
              </View>
              <View style={styles.container2}>
                <Text style={styles.title}>Serial Number</Text>
                <Text style={styles.value}>4F:6A:23:9B:00:12:89</Text>
              </View>
              <View style={styles.container2}>
                <Text style={styles.title}>Valid From</Text>
                <Text style={styles.value}>2025-01-01</Text>
                <Text style={styles.title}>Expires on</Text>
                <Text style={styles.value}>2027-01-01</Text>
              </View>
              <View></View>
            </View>
          </>
        )}
      </View>
    </ScreenLayout>
  );
};

export default ManageDigitalSignature;

const styles = StyleSheet.create({
  title: {
    fontFamily: font.intermedium,
    fontSize: 16,
    color: Color.neutral_300,
    marginTop: 6,
  },
  value: {
    fontFamily: font.intermedium,
    fontSize: 16,
    color: Color.neutral_600,
    marginTop: 1,
  },
  container2: {
    marginTop: 6,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  uninstallBtn: {
    backgroundColor: "#ff4444",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  uninstallText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  replaceBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  replaceText: {
    fontSize: 14,
    color: "#404040",
  },
});
