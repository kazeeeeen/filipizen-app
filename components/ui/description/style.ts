import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    width: wp("95%"),
    marginLeft: wp("6%"),
    marginTop: wp("-1%"),
  },
  text: {
    fontFamily: font.interregular,
    fontSize: 16,
    color: Color.neutral_50,
  },
});

export default styles;
