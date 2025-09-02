import ScreenLayout from "@/components/screen-layout";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { Images } from "@/constants/Images";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const CredentialDetail = () => {
  return (
    <ScreenLayout
      header={
        <View>
          <Header title="Detail" backHandler={true} />
        </View>
      }
      scrollable={true}
    >
      <View style={{ padding: 5, paddingHorizontal: 25 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <Image
            source={Images.prc}
            style={{
              width: wp("11%"),
              height: hp("5%"),
            }}
          />
          <Text style={{ fontFamily: font.intermedium, fontSize: 16 }}>
            Professional Regulation Commission
          </Text>
        </View>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <View
            style={{
              backgroundColor: "#FFF9ED",
              borderRadius: 10,
              padding: 2,
              paddingHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <Image
              source={Images.qr}
              style={{
                width: wp("25%"),
                height: hp("15%"),
              }}
            />
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <View style={{ padding: 5, marginLeft: 12 }}>
                <Text
                  style={{
                    fontFamily: font.intermedium,
                    fontSize: 15,
                    color: Color.neutral_600,
                  }}
                >
                  VALIDATING AGENCY
                </Text>
                <Text
                  style={{
                    fontFamily: font.interregular,
                    fontSize: 15,
                    color: Color.neutral_300,
                  }}
                >
                  Oroquieta City
                </Text>
              </View>
              <View style={{ padding: 5, marginLeft: 12 }}>
                <Text
                  style={{
                    fontFamily: font.intermedium,
                    fontSize: 15,
                    color: Color.neutral_600,
                  }}
                >
                  DIGITAL SIGNATURE
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: font.interregular,
                      fontSize: 15,
                      color: Color.neutral_300,
                    }}
                  >
                    a84f8b2c6e1fdd...c2d3e4
                  </Text>
                  <MaterialIcons
                    name="content-copy"
                    size={18}
                    color={Color.neutral_200}
                    style={{ marginLeft: 6 }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.information}>Profession Information</Text>

            <Text style={styles.title}>Profession</Text>
            <Text style={styles.value}>Civil Engineer</Text>

            <View style={styles.container2}>
              <Text style={styles.title}>PRC License No.</Text>
              <Text style={styles.value}>123456</Text>
            </View>
            <View style={styles.container2}>
              <Text style={styles.title}>Initial Registration Date</Text>
              <Text style={styles.value}>March 12, 2020</Text>
            </View>
            <View style={styles.container2}>
              <Text style={styles.title}>Expiry Date</Text>
              <Text style={styles.value}>March 12, 2025</Text>
            </View>
            <View style={styles.container2}>
              <Text style={styles.title}>Exam Name</Text>
              <Text style={styles.value}>Civil Engineering Licensure Exam</Text>
            </View>
            <View style={styles.container2}>
              <Text style={styles.title}>Date of Passing</Text>
              <Text style={styles.value}>December 21, 2019</Text>
            </View>
          </View>
          <Text style={styles.information2}>Personal Information</Text>

          <Text style={styles.title}>Name</Text>
          <Text style={styles.value}>Cayenne Ezra Gagno</Text>

          <View style={styles.container2}>
            <Text style={styles.title}>Birthdate</Text>
            <Text style={styles.value}>January 1, 2000</Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.title}>Birthplace</Text>
            <Text style={styles.value}>Cavite, Philippines</Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.title}>Gender</Text>
            <Text style={styles.value}>Female</Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.title}>Citizenship</Text>
            <Text style={styles.value}>Filipino</Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.value}>cayenne@gmail.com</Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.title}>Mobile No.</Text>
            <Text style={styles.value}>+63 912 345 6789</Text>
          </View>
        </View>
        <View>
          <Text style={styles.information2}>Address Information</Text>

          <Text style={styles.title}>Address</Text>
          <Text style={styles.value}>
            123 Main St, Adlas, Silang, Cavite, Philippines
          </Text>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default CredentialDetail;

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
  container: {
    marginTop: 12,
  },
  container2: {
    marginTop: 6,
  },
  information: {
    fontFamily: font.intermedium,
    fontSize: 18,
    color: Color.primary_400,
  },
  information2: {
    marginTop: 20,
    fontFamily: font.intermedium,
    fontSize: 18,
    color: Color.primary_400,
  },
});
