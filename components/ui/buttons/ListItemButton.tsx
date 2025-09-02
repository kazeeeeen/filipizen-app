import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface Props {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const ListItemButton: React.FC<Props> = ({ title, icon, onPress, style }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={wp("8%")}
        color={Color.primary_400}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp("2%"),
    width: wp("95%"),
    justifyContent: "space-between",
  },
  iconContainer: {
    marginRight: wp("3%"),
  },
  title: {
    flex: 1,
    fontSize: wp("4.5%"),
    fontFamily: font.interregular,
    color: Color.neutral_600,
  },
});

export default ListItemButton;
