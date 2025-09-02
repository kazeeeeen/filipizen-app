import { font } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, FlatList, Pressable, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.4;
const _spacing = 18;
const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];

interface DialPadProps {
  onPress: (item: (typeof dialPad)[number]) => void;
}

const DialPad: React.FC<DialPadProps> = ({ onPress }) => {
  return (
    <FlatList
      numColumns={3}
      data={dialPad}
      style={{ flexGrow: 0 }}
      scrollEnabled={false}
      columnWrapperStyle={{ gap: _spacing }}
      contentContainerStyle={{ gap: _spacing }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <Pressable disabled={item === ""} onPress={() => onPress(item)}>
            <View
              style={{
                width: dialPadSize,
                height: dialPadSize,
                borderRadius: dialPadSize,
                borderWidth: typeof item !== "number" ? 0 : 1,
                borderColor: "transparent",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  typeof item !== "number" ? "transparent" : "#F2BB4E",
              }}
            >
              {item === "del" ? (
                <Ionicons
                  name="backspace"
                  color={"#3D3D3D"}
                  size={dialPadTextSize}
                />
              ) : (
                <Text
                  style={{
                    fontSize: dialPadTextSize,
                    fontFamily: font.intermedium,
                    color: "white",
                  }}
                >
                  {item}
                </Text>
              )}
            </View>
          </Pressable>
        );
      }}
    />
  );
};

export default DialPad;
