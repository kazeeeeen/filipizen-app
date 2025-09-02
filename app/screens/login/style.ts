import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    flex: 1,
    backgroundColor: Color.white,
  },
  mpin: {
    marginTop: 30,
    fontWeight: "600",
    color: "#3D3D3D",
    fontFamily: font.intermedium,
    fontSize: 18,
  },
  image: {
    width: 550,
    height: 150,
    marginTop: 20,
  },
  forgotmpin: {
    marginTop: 35,
    color: Color.neutral_400,
    fontWeight: "400",
    fontFamily: font.intermedium,
    fontSize: 16,
  },
  account: {
    color: "#3D3D3D",
    flexDirection: "row",
    gap: 5,
  },
  text: {
    fontWeight: "700",
    color: "#3D3D3D",
  },
  signup: {
    color: "#F2BB4E",
    fontWeight: "700",
  },
  numberborder: {
    flexDirection: "row",
    width: 200,
    height: 45,
    borderWidth: 1,
    borderRadius: 29,
    borderColor: Color.primary_400,
    paddingVertical: 5,
    marginTop: 25,
    padding: 25,
    alignItems: "center",
    flexShrink: 0,
    gap: 35,
  },
  number: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3D3D3D",
  },
  dialPadContainer: {
    flexDirection: "row",
    gap: 8 * 2,
    marginBottom: 18 * 2,
    marginTop: 30,
    height: 12 * 2,
    alignItems: "flex-end",
  },
});

export default styles;
