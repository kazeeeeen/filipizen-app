import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  textContainer: {
    //textAlign: "justify",
    fontSize: wp("3.5%"),
    width: wp("85%"),
    paddingTop: hp("1%"),
    color: Color.neutral_500,
    fontFamily: font.interregular,
  },

  title: {
    width: wp("90%"),
    paddingTop: hp("2%"),
    color: Color.primary_400,
    fontWeight: "600",
    fontFamily: font.intermedium,
    fontSize: wp("3.8%"),
  },
  paragraph: {
    width: wp("85%"),
    color: Color.neutral_500,
    fontFamily: font.interregular,
    fontSize: wp("3.5 %"),
    marginTop: hp("1%"),
  },
  bulletList: {
    marginLeft: 12,
    marginBottom: 10,
  },
  bulletItem: {
    marginTop: 2,
    fontSize: wp("3.5 %"),
    fontFamily: font.interregular,
    color: Color.neutral_500,
    marginBottom: 3,
    width: wp("85%"),
  },
});

export default styles;
