// components/UniversalLayout.tsx

import React from "react";
import { ScrollView, StatusBar, StatusBarStyle, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";

interface UniversalLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  scrollable?: boolean;
  statusBarStyle?: StatusBarStyle;
  statusBarBackgroundColor?: string;
}

//fix status bar when in darkmode

const ScreenLayout: React.FC<UniversalLayoutProps> = ({
  header,
  children,
  footer,
  scrollable,
  statusBarStyle = "dark-content",
  statusBarBackgroundColor = "#FFFFFF",
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
        translucent={false}
      />

      {/* Header */}
      {header && <View style={styles.header}>{header}</View>}

      {/* Body */}
      {scrollable ? (
        <ScrollView contentContainerStyle={styles.body}>{children}</ScrollView>
      ) : (
        <View style={styles.body}>{children}</View>
      )}

      {/* Footer */}
      {footer && <View style={styles.footer}>{footer}</View>}
    </SafeAreaView>
  );
};

export default ScreenLayout;
