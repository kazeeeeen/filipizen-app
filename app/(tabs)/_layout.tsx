import { font } from "@/constants/Fonts";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#4D4D4D",
        tabBarActiveTintColor: "#F2BB4E",
        tabBarLabelStyle: {
          marginBottom: 5,
          fontSize: 12,
          fontFamily: font.interregular,
        },
        tabBarStyle: {
          borderTopColor: "#FFD889",
          borderTopWidth: 0.7,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 1,
          paddingVertical: 1,
          paddingBottom: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(inbox-screen)"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="envelope-o" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(credential-screen)"
        options={{
          title: "Credentials",
          tabBarIcon: ({ color }) => (
            <AntDesign size={28} name="idcard" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(qrcode-scan-screen)"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="qr-code-scanner" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(transaction-screen)"
        options={{
          title: "Transaction",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="swap-horiz" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(settings-screen)"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="settings-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
