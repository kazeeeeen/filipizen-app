import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

interface DropDownIssuerProps {
  items: { key: string; value: string }[]; // Ensure correct data structure
  value: string;
  placeholder?: string;
  style?: any;
  onSelect?: (value: string) => void;
  open: boolean;
  search: boolean;
  save?: any;
  showError?: boolean;
  errorMessage?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const FDropDown: React.FC<DropDownIssuerProps> = ({
  items,
  value,
  placeholder,
  style,
  open,
  showError = false,
  errorMessage,
  setOpen,
  search,
  setValue,
  onSelect,
  save,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.container}>
      <SelectList
        setSelected={(selected: any) => {
          setValue(selected);
          if (onSelect) onSelect(selected);
        }}
        save={save == "key" ? "key" : "value"}
        data={items}
        placeholder={placeholder || "Select an option"}
        searchPlaceholder="Search..."
        fontFamily={font.interlight}
        boxStyles={{
          ...styles.box,
          ...(isFocused && {
            borderWidth: open ? 1.5 : 1,
            borderColor: isFocused ? Color.primary_400 : Color.primary_400,
          }),
          ...style,
        }}
        dropdownStyles={styles.dropdown}
        arrowicon={
          <FontAwesome
            name="chevron-down"
            size={12}
            color={Color.neutral_500}
          />
        }
        searchicon={
          <Ionicons
            name="search-outline"
            size={17}
            color={Color.neutral_300}
            style={{ paddingHorizontal: hp(".5%") }}
          />
        }
        notFoundText="No results found."
        search={search}
        maxHeight={hp("30%")}
        //onFocus={() => setIsFocused(true)}
        //  onDropdownClose={() => setIsFocused(false)}
        {...restProps}
      />
      {showError && errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("90%"),
    marginBottom: hp("1%"),
    marginTop: hp(".7%"),
  },
  box: {
    height: hp("7%"),
    fontFamily: font.interregular,
    fontSize: wp("3.5%"),
    paddingHorizontal: wp("4%"),
    borderColor: Color.neutral_25,
    borderWidth: 1,
    alignItems: "center",
  },
  dropdown: {
    position: "absolute",
    top: hp("6.5%"),
    left: 0,
    width: "100%",
    backgroundColor: "white",
    borderColor: Color.primary_400,
    borderWidth: 1.5,
    zIndex: 999,
  },
  errorText: {
    marginLeft: wp("2.5%"),
    color: "red",
    fontSize: wp("3.2%"),
    marginTop: hp("0.5%"),
  },
});

export default FDropDown;
