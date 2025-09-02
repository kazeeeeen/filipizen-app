import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: hp("3%"),
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  requestContainer: {
    padding: 15,
    width: wp("100%"),
    flexDirection: "row",
  },

  requestNameContainer: {
    width: "90%",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: wp("4%"),
    elevation: 2,
    shadowOpacity: 5,
    backgroundColor: "white",
  },

  requestName: {
    fontFamily: font.intersemibold,
    fontSize: 18,
    color: "black",
  },

  chatButton: {
    position: "absolute",
    bottom: hp("3%"),
    right: wp("5%"),
    backgroundColor: Color.white,
    borderRadius: 30,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default styles;
