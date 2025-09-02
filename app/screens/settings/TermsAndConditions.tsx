import ScreenLayout from "@/components/screen-layout";
import Header from "@/components/ui/header";
import React from "react";
import { Text, View } from "react-native";
import styles from "./style";

const TermsAndConditions = () => {
  return (
    <ScreenLayout
      header={
        <View>
          <Header title="Terms and Conditions" backHandler={true} />
        </View>
      }
      scrollable={true}
    >
      <View style={{ alignItems: "center" }}>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.paragraph}>
            By using Filipizen, you agree to the following terms and conditions.
            Please read carefully to understand how your data is handled and the
            responsibilities involved in using the app.
          </Text>
          <Text style={styles.title}>1. SECURE CONNECTIVITY</Text>
          <Text style={styles.paragraph}>
            By using Filipizen, you agree that this app connects you securely to
            government entities and registered businesses in the Philippines to
            access various services.
          </Text>
          <Text style={styles.title}>2. DATA HANDLING AND STORAGE</Text>
          <Text style={styles.paragraph}>
            Filipizen does not store your personal or business data. All data is
            digitally signed locally on your device and is relayed directly to
            the intended recipient(e.g., government systems or business
            platforms) for processing:
          </Text>
          <Text style={styles.paragraph}>Your information—such as:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Name</Text>
            <Text style={styles.bulletItem}>• PhilSys Number</Text>
            <Text style={styles.bulletItem}>• Business Details</Text>
            <Text style={styles.bulletItem}>• Attachments</Text>
          </View>
          <Text style={styles.paragraph}>
            —is sent to these recipients, who may store it based on their own
            policies.
          </Text>
          <Text style={styles.title}>
            3. DATA PROTECTION AND RESPONSIBILITY
          </Text>
          <Text style={styles.paragraph}>
            We use encryption to protect your data in transit. However, we are
            not responsible for:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • How recipients handle your data
            </Text>
            <Text style={styles.bulletItem}>
              • Any data breaches or misuse outside the app
            </Text>
          </View>
          <Text style={styles.title}>4. IDENTITY VERIFICATION</Text>
          <Text style={styles.paragraph}>
            We use encryption to protect your data in transit. However, we are
            not responsible for:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Your PhilSys Number</Text>
            <Text style={styles.bulletItem}>• Your existing records</Text>
            <Text style={styles.bulletItem}>
              • Additional verification steps such as an interview, depending on
              the service provider
            </Text>
          </View>
          <Text style={styles.title}>5. USERS RESPONSIBILITY</Text>
          <Text style={styles.paragraph}>
            You use Filipizen at your own risk. It is your responsibility to:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Secure your device</Text>
            <Text style={styles.bulletItem}>
              • Understand how your data is processed once sent
            </Text>
          </View>
          <Text style={styles.title}>6. LEGAL COMPLIANCE</Text>
          <Text style={styles.paragraph}>This app complies with:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • The Data Privacy Act of 2012 (RA 10173)
            </Text>
            <Text style={styles.bulletItem}>
              • The Electronic Commerce Act of 2000 (RA 8792)
            </Text>
          </View>
          <Text style={styles.paragraph}>
            for all transactions conducted within the Philippines.{" "}
          </Text>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default TermsAndConditions;
