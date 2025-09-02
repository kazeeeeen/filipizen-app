import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, useContext, useEffect, useState } from "react";

type AuthContextType = {
  userToken: string | null;
  hasAccount: boolean;
  mpin: string | null;
  login: (token: string) => void;
  logout: () => void;
  otp: any;
  setOtp: any;
  checkUserStatus: () => Promise<void>;
};

const defaultAuthValue: AuthContextType = {
  userToken: null,
  hasAccount: false,
  mpin: null,
  otp: "",
  setOtp: () => {},
  login: () => {},
  logout: () => {},
  checkUserStatus: async () => {},
};

export const AuthContext = React.createContext(defaultAuthValue);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [hasAccount, setHasAccount] = useState<boolean>(false);
  const [mpin, setMpin] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>("");

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const storedMpin = await AsyncStorage.getItem("mpin");
    setUserToken(token);
    setHasAccount(!!token);
    setMpin(storedMpin);
  };

  const login = async (token: string) => {
    setUserToken(token);
    await AsyncStorage.setItem("userToken", token);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setUserToken(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        hasAccount,
        mpin,
        login,
        logout,
        checkUserStatus,
        otp,
        setOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
