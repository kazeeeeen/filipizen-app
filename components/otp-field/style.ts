import { Color } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
  otpInput: {
    backgroundColor: "white",
    minWidth: "12%",
    borderRadius: 10,
    padding: 14,
  },
  otpInputText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  otpInputFocused: {
    borderColor: "#f2bb4e",
    borderWidth: 2,
  },
  container: {
    flex: 1,
    backgroundColor: Color.neutral_300,
  },
  OTPInputSection: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp("1%"),
    marginTop: hp("3%"),
  },
  hiddenTextInput: {
    position: "absolute",
    width: wp("0.5%"),
    height: hp("0.1%"),
    opacity: 0,
  },
  OTPInputContainer: {
    width: wp("90%"),
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default styles;
