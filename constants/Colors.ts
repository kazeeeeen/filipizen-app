/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Color = {
  //PRIMARY COLORS (YellowishOranges)
  primary_400: "#F2BB4E",
  primary_300: "#FFD889",
  primary_200: "#FFF4E0",
  primary_100: "#FFF8EB",

  //grays
  neutral_600: "#3D3D3D",
  neutral_500: "#4D4D4D",
  neutral_400: "#666666",
  neutral_300: "#999999",
  neutral_200: "#BFBFBF",
  neutral_100: "#EBEBEB",
  neutral_50: "#71727A",
  neutral_25: "#CCCBC9",

  //shades
  white: "#FFFFFF",

  //red
  red_200: "#E53935",
  red_100: "#EF5350",

  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
