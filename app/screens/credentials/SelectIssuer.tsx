import FDropDown from "@/components/input-types/DropdownSearch";
import ScreenLayout from "@/components/screen-layout";
import Description from "@/components/ui/description";
import Header from "@/components/ui/header";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const sampleIssuers = [
  {
    label: "Tagbilaran City",
    value: "Tagbilaran City",
    key: "tagbilaran_city",
  },
  { label: "Malinao, Aklan", value: "Malinao, Aklan", key: "malinao_aklan" },
  { label: "Legazpi City", value: "Legazpi City", key: "legazpi_city" },
  { label: "Oroquieta City", value: "Oroquieta City", key: "oroquieta_city" },
  {
    label: "San Jose de Buenavista",
    value: "San Jose de Buenavista",
    key: "san_jose_de_buenavista",
  },
];
const SelectIssuer = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [issuer, setIssuer] = useState<string>("");
  const issuers = sampleIssuers;

  const handleSelectedIssuer = (selectedKey: string) => {
    setIssuer(selectedKey);
    const selectedIssuer = sampleIssuers.find(
      (item) => item.key === selectedKey
    );
    if (selectedIssuer) {
      // Navigate to next screen, pass issuer info if needed
      router.push("/screens/credentials/DynamicFormEntry"); // Change to your actual route
    }
  };

  return (
    <ScreenLayout
      header={
        <>
          <Header title="Select Issuer" backHandler={true} />
          <Description text="Please select a Local Government Unit" />
        </>
      }
    >
      <View style={{ alignItems: "center", paddingTop: hp("2%") }}>
        <FDropDown
          items={issuers}
          value={issuer}
          search={true}
          placeholder="Search LGU"
          open={open}
          setOpen={setOpen}
          setValue={setIssuer}
          onSelect={handleSelectedIssuer}
          save="key"
        />
      </View>
    </ScreenLayout>
  );
};

export default SelectIssuer;

const styles = StyleSheet.create({});
