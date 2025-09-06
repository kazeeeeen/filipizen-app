import React from "react";
import { StyleSheet, View } from "react-native";

const TransactionScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Pressable
        style={{
          backgroundColor: Color.white,
          borderColor: Color.neutral_100,
          borderWidth: 1.3,
          elevation: 0.2,
          padding: 10,
          borderRadius: 8,
          marginBottom: 12,
          width: wp("90%"),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: wp("2%"),
            width: wp("90%"),
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              backgroundColor: "#F8F8F8",
              padding: wp("3%"),
              borderRadius: 8,
            }}
          >
            <Image
              source={Images.prc}
              style={{
                width: hp("7%"),
                height: hp("7%"),
              }}
            />
          </View>
          <View style={{ marginRight: wp("24%") }}>
            <Text style={{ fontFamily: font.intersemibold, fontSize: 16 }}>
              PRC Card
            </Text>
            <Text style={{ fontFamily: font.intermedium, fontSize: 14 }}>
              Active
            </Text>
          </View>
          <View style={{ paddingRight: wp("4%") }}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={wp("8%")}
              color={Color.primary_400}
            />
          </View>
        </View>
      </Pressable> */}
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({});
