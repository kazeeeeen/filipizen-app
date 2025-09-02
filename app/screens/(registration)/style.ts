import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

//Onboarding styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.white,
  },
  buttonLayout: {
    width: wp("90%"),
    height: hp("6%"),
    borderRadius: wp("8%"),
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
  },
  imageLayout: {
    height: hp("45%"),
    width: wp("97%"),
  },
  contentContainer: {
    alignItems: "center",
    marginTop: hp("2.96%"),
  },
  textHeader: {
    fontSize: wp("8%"),
    fontFamily: font.interextrabold,
    color: Color.neutral_500,
  },
  textBody: {
    fontSize: wp("4%"),
    fontFamily: font.intermedium,
    color: Color.neutral_50,
    width: wp("95%"),
    textAlign: "center",
    padding: wp("2%"),
  },

  //Contact Information
  lowerDescription: {
    justifyContent: "space-between",
    paddingHorizontal: wp("5%"),
    marginTop: hp("1%"),
    marginBottom: hp("2%"),
  },

  lowerText: {
    textAlign: "justify",
    width: wp("90%"),
    fontFamily: font.interregular,
    color: Color.neutral_50,
  },
  bodyContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    alignItems: "center",
    paddingTop: hp("2%"),
  },

  //OTP Screen
  inputFieldsContainer: {
    rowGap: hp("1.5%"),
  },

  otpPhrase: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textError: {
    color: Color.red_200,
    fontSize: 13,
    fontFamily: font.interregular,
  },

  //Register MPIN Screen
  checkBoxContainer: {
    marginLeft: wp("4%"),
    marginTop: hp("6%"),
  },
  checkBoxText: {
    flexDirection: "row",
    gap: wp("1%"),
  },
  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionCheckBox: {
    flexDirection: "row",
    width: "85%",
    marginBottom: 10,
  },
  terms: {
    fontFamily: "interregular",
    color: Color.neutral_50,
  },
  conditions: {
    color: Color.primary_400,
    marginTop: 2,
  },
});

export default styles;
