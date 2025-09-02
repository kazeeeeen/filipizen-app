import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
const styles = StyleSheet.create({
  //mainheader styles
  container: {
    backgroundColor: Color.white,
  },
  title: {
    fontFamily: font.interbold,
    fontSize: wp("6.5%"),
    color: Color.neutral_500,
  },
});

export default styles;
