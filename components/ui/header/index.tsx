import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Platform } from "react-native";
import { Appbar } from "react-native-paper";
import styles from "./style";

interface HeaderProps {
  title: string;
  icon?: any;
  handlePress?: () => void;
  backHandler?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  icon,
  handlePress,
  backHandler,
}) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header statusBarHeight={2} style={styles.container}>
      {backHandler && <Appbar.BackAction onPress={() => navigation.goBack()} />}
      <Appbar.Content
        title={title}
        titleStyle={styles.title}
        style={[
          Platform.OS === "ios" && { alignItems: "flex-start" },
          !backHandler && Platform.OS === "ios" && { marginLeft: -32 }, // remove extra space
        ]}
      />
      {icon && <Appbar.Action icon={icon} onPress={handlePress} />}
    </Appbar.Header>
  );
};

export default Header;
