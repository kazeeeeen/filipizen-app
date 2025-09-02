import axios from "axios";

const SMS_API = process.env.EXPO_PUBLIC_SMS_API || "";

export const SmsAPI = {
  send: async function (queryParams: any) {
    try {
      const response = await axios.get(`${SMS_API}${queryParams}`);
      return response.data;
    } catch (error) {
      console.log("Error FROM SMS API", error);
    }
  },
};
