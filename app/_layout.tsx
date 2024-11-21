import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import "react-native-reanimated";

import { useAuthStore } from "@/context/store/AuthStore";

import { AlertProvider } from "@/context/AlertProvider";
import "@/global.css";
import useLoadToken from "@/hooks/UseLoadToken";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import SplashScreen2 from "./splashScreen";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
export default function RootLayout() {
  const { authState, isLoading, isVerified } = useAuthStore();
  const [isAppReady, setIsAppReady] = useState(false);

  // Load the fonts used in the app.
  const [fontsLoaded, fontsError] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    // Handle errors loading fonts
    if (fontsError) console.error("Font loading error:", fontsError);
  }, [fontsError]);

  useLoadToken();

  useEffect(() => {
    const prepareApp = async () => {
      if (fontsLoaded && !isLoading) {
        setIsAppReady(true);
      }
    };

    prepareApp();
  }, [fontsLoaded, isLoading]);

  useEffect(() => {
    if (isAppReady) {
      if (authState.authenticated) {
        router.replace(isVerified ? "/home" : "/verify-email");
      }
    }
  }, [isAppReady, authState.authenticated, isVerified]);

  if (!fontsLoaded || !isAppReady) {
    return <SplashScreen2 />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <>
      <AlertProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="verify-code" />
          <Stack.Screen
            name="splashScreen"
            options={{
              animation: "fade",
            }}
          />
        </Stack>
      </AlertProvider>
      <StatusBar style="dark" />
    </>
  );
}
