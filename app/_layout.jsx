import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useThemeStore } from "@/store";
import { RootSiblingParent } from "react-native-root-siblings";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const { setTheme } = useThemeStore();
  const systemTheme = useColorScheme() ?? "dark";

  useEffect(() => {
    if (error) throw error;
    setTheme(systemTheme);

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [systemTheme, fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <RootSiblingParent>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen
          name="+not-found"
          options={{ title: "Oops!", headerTintColor: "red" }}
        />
      </Stack>
    </RootSiblingParent>
  );
}
