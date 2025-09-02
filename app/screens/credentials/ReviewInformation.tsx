import ScreenLayout from "@/components/screen-layout";
import Button2 from "@/components/ui/buttons/Button2";
import Description from "@/components/ui/description";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ReviewInformation = () => {
  return (
    <ScreenLayout
      header={
        <>
          <Header title="Review Information" backHandler={true} />
          <Description text="Please review your information before submitting." />
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
            name="Submit"
            mode="contained"
            onPress={() => {
              router.push("/screens/credentials/SuccessfulMessage");
            }}
            color={Color.primary_400}
          />
        </View>
      }
      scrollable={true}
    >
      <View style={{ padding: 5, paddingHorizontal: 25, marginTop: hp("2%") }}>
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

export default ReviewInformation;

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
