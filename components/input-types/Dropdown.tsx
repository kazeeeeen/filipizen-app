import { Color } from "@/constants/Colors";
import React from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styles from "./style";

export interface DropDownProps {
  items: ItemProps[];
  value: string;
  placeholder?: string;
  showError?: boolean;
  errorMessage?: string;
  style?: any;
  open: boolean;
  get: (path: string) => any;
  set: (path: string, value: any) => void;
  setOpen: React.Dispatch<any>;
  setValue: React.Dispatch<any>;
  setItems: React.Dispatch<any>;
}

interface ItemProps {
  id?: string;
  label: string;
  value: string;
}

const DropDown: React.FC<DropDownProps> = ({
  items,
  value,
  placeholder,
  style,
  showError = false,
  errorMessage = "",
  open,
  get,
  set,
  setOpen,
  setValue,
  setItems,
  ...restProps
}) => {
  return (
    <View style={styles.container}>
      <DropDownPicker
        dropDownDirection="BOTTOM"
        style={[
          styles.pickerContainer,
          {
            borderColor: open ? Color.primary_400 : Color.neutral_25,
            borderWidth: open ? 1.5 : 1,
          },
        ]}
        dropDownContainerStyle={{
          width: wp("90%"),
          marginTop: 5,
          alignSelf: "center",
          borderBottomEndRadius: wp("2%"),
          borderBottomLeftRadius: wp("2%"),
          borderWidth: open ? 1.5 : 1,
          borderColor: open ? Color.primary_400 : Color.neutral_25,
          zIndex: 2000,
        }}
        items={items}
        value={value}
        setValue={setValue}
        setItems={setItems}
        open={open}
        setOpen={setOpen}
        multiple={false}
        placeholder={placeholder}
        placeholderStyle={{ color: Color.neutral_600, marginLeft: 8 }}
        listItemLabelStyle={styles.listItemLabelStyle}
        labelStyle={styles.labelStyle}
        {...restProps}
      />
      {showError && errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default DropDown;
