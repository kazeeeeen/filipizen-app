import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const storedPin = await AsyncStorage.getItem("mpin");
        if (storedPin) {
          router.replace("/screens/login");
        } else {
          router.replace("/screens/(registration)");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    checkUserAuthentication();
  }, [router]);
}
