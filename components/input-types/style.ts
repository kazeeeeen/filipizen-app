import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  //Textfield styles:
  outline: {
    borderRadius: wp("2%"),
    borderColor: Color.primary_400,
  },
  errorText: {
    marginLeft: wp("1%"),
    color: "red",
    fontSize: wp("3.2%"),
    marginTop: hp("0.5%"),
  },
  fieldContainer: {
    width: wp("90%"),
    height: hp("7%"),
    fontFamily: font.interregular,
    fontSize: wp("3.5%"),
    paddingHorizontal: wp("1%"),
    textDecorationColor: Color.neutral_600,
  },
  container: {
    marginBottom: hp("1.5%"),
  },

  //DropdownSeach styles
  box: {
    height: hp("7%"),
    fontFamily: font.interregular,
    fontSize: wp("3.5%"),
    paddingHorizontal: wp("4%"),
    borderColor: Color.neutral_25,
    borderWidth: 1,
    alignItems: "center",
  },

  dropdown: {
    position: "absolute",
    top: hp("6.5%"),
    left: 0,
    width: "100%",
    backgroundColor: "white",
    borderColor: Color.primary_400,
    borderWidth: 1.5,
    zIndex: 999,
  },
  dropdownContainer: {
    width: wp("90%"),
    marginBottom: hp("1%"),
    marginTop: hp(".7%"),
  },
  //DropDown styles
  pickerContainer: {
    width: wp("90%"),
    height: hp("7%"),
    margin: 7,
    marginBottom: hp("1%"),
    borderRadius: wp("2%"),
    alignSelf: "center",
  },
  listItemLabelStyle: {
    paddingLeft: 8,
    fontFamily: font.interregular,
    fontSize: wp("3.5%"),
    color: Color.neutral_600,
  },
  labelStyle: {
    paddingLeft: 8,
    fontFamily: font.interregular,
    fontSize: wp("3.5%"),
    color: Color.neutral_600,
  },
});

export default styles;
