import DateField from "@/components/input-types/DateField";
import DropDown from "@/components/input-types/Dropdown";
import EmailField from "@/components/input-types/EmailField";
import MobileNoField from "@/components/input-types/MobileNoField";
import TextField from "@/components/input-types/TextField";
import ScreenLayout from "@/components/screen-layout";
import Button2 from "@/components/ui/buttons/Button2";
import Description from "@/components/ui/description";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { useEntityState } from "@/hooks/useEntityState";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const DynamicFormEntry = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  const { get, set } = useEntityState({
    personalinfo: {
      firstname: "",
      middlename: "",
      lastname: "",
      birthdate: "",
      birthplace: "",
      gender: "",
      citizenship: "",
      email: "",
      mobileno: "",
    },
    addressinfo: {
      streetno: "",
      streetname: "",
      province: "",
      city: "",
      barangay: "",
      postalcode: "",
      country: "",
    },
    professioninfo: {
      profession: "",
      prcno: "",
      initialdate: "",
      expirydate: "",
      examname: "",
      datepassing: "",
    },
  });
  const [screenIndex, setScreenIndex] = useState(0);
  const sectionTitles = [
    "Personal Information",
    "Address Information",
    "Profession Information",
  ];
  const renderSection = () => {
    switch (screenIndex) {
      case 0:
        return (
          <>
            <TextField
              label="First Name"
              name="firstname"
              placeholder="Enter your first name"
              errorMessage="First name is required."
              get={get}
              set={set}
            />
            <TextField
              label="Middle Name"
              name="middlename"
              placeholder="Enter your middle name"
              get={get}
              set={set}
            />
            <TextField
              label="Last Name"
              name="lastname"
              placeholder="Enter your last name"
              errorMessage="Last name is required."
              get={get}
              set={set}
            />
            <DateField
              label="Date of Birth"
              placeholder="Enter your date of birth"
              name="birthdate"
              get={get}
              set={set}
            />

            <TextField
              label="Birthplace"
              name="birthplace"
              placeholder="Enter your birthplace"
              get={get}
              set={set}
            />
            <TextField
              label="Gender"
              name="gender"
              placeholder="Enter your gender"
              get={get}
              set={set}
            />
            <TextField
              label="Citizenship"
              name="citizenship"
              placeholder="Enter your citizenship"
              get={get}
              set={set}
            />
            <EmailField
              name="email"
              errorMessage="Email is required."
              get={get}
              set={set}
            />
            <MobileNoField
              label="Mobile Number"
              name="mobileno"
              errorMessage="Invalid mobile number"
              get={get}
              set={set}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              label="Street No."
              name="streetno"
              placeholder="Enter your street number"
              get={get}
              set={set}
            />
            <TextField
              label="Street Name"
              name="streetname"
              placeholder="Enter your street name"
              get={get}
              set={set}
            />
            <TextField
              label="Barangay"
              name="barangay"
              placeholder="Enter your barangay"
              errorMessage="Barangay is required."
              get={get}
              set={set}
            />
            <TextField
              label="City"
              name="city"
              placeholder="Enter your city"
              errorMessage="City is required."
              get={get}
              set={set}
            />
            <TextField
              label="Province"
              name="province"
              placeholder="Enter your province"
              errorMessage="Province is required."
              get={get}
              set={set}
            />
            <TextField
              label="Country"
              name="country"
              placeholder="Enter your country"
              errorMessage="Country is required."
              get={get}
              set={set}
            />
            <TextField
              label="Postal Code"
              name="postalcode"
              placeholder="Enter your postal code"
              errorMessage="Postal code is required."
              get={get}
              set={set}
            />
          </>
        );
      case 2:
        return (
          <>
            <DropDown
              items={[
                { label: "Architecture", value: "architecture" },
                { label: "Accountancy", value: "accountancy" },
                {
                  label: "Professional Teaching",
                  value: "professional_teaching",
                },
                {
                  label: "Aeronautical Engineering",
                  value: "aeronautical_engineering",
                },
                { label: "Civil Engineering", value: "civil_engineering" },
                {
                  label: "Electrical Engineering",
                  value: "electrical_engineering",
                },
                {
                  label: "Mechanical Engineering",
                  value: "mechanical_engineering",
                },
                { label: "Dentistry", value: "dentistry" },
                { label: "Pharmacy", value: "pharmacy" },
                { label: "Psychology", value: "psychology" },
              ]}
              value={get("professioninfo.profession")}
              setValue={(callback) => {
                const newValue =
                  typeof callback === "function"
                    ? callback(get("professioninfo.profession"))
                    : callback;
                set("professioninfo.profession", newValue);
              }}
              placeholder="Select an option"
              open={open["dropdown"]}
              setOpen={(isOpen) => setOpen({ ...open, dropdown: isOpen })}
              setItems={() => {}}
            />

            <TextField
              label="PRC License No."
              name="prcno"
              placeholder="Enter your PRC License No."
              errorMessage="PRC License No. is required."
              get={get}
              set={set}
            />
            <DateField
              label="Initial Registration Date"
              name="initialdate"
              placeholder="Enter your initial registration date"
              errorMessage="Initial registration date is required."
              get={get}
              set={set}
            />
            <DateField
              label="Expiry Date"
              name="expirydate"
              placeholder="Enter your expiry date"
              errorMessage="Expiry date is required."
              get={get}
              set={set}
            />
          </>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (screenIndex < 2) {
      setScreenIndex(screenIndex + 1);
    } else {
      router.push("/screens/credentials/UploadID");
    }
  };

  const handleBack = () => {
    if (screenIndex > 0) {
      setScreenIndex(screenIndex - 1);
    }
  };
  return (
    <ScreenLayout
      header={
        <View>
          <Header title="PRC Information" backHandler={true} />
          <Description text="Please input your contact information." />
        </View>
      }
      footer={
        <View
          style={{
            alignItems: "center",
            marginTop: hp("1%"),
            marginBottom: hp("1%"),
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button2
            name={screenIndex < 2 ? "Next" : "Submit"}
            mode="contained"
            color={Color.primary_400}
            onPress={handleNext}
          />
        </View>
      }
      scrollable={true}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 24,
            marginBottom: 4,
          }}
        >
          <Text style={{ fontFamily: font.intermedium, fontSize: 16 }}>
            {sectionTitles[screenIndex]}
          </Text>
          {screenIndex > 0 && (
            <Button2
              name="Back"
              mode="text"
              textColor={Color.primary_400}
              onPress={handleBack}
            />
          )}
        </View>
        <View style={styles.formContainer}>{renderSection()}</View>
      </View>
    </ScreenLayout>
  );
};

export default DynamicFormEntry;

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
  },
});
