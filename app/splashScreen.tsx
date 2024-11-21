import { images } from "@/constants";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
const SplashScreen2 = () => {
  return (
    <>
      <View className="flex-1 flex flex-col justify-center items-center">
        <Image
          source={images.pesappsplash}
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        <Image
          source={images.pesapplogo}
          className="h-14 w-10/12 block object-contain"
        />
        <Text className="text-white text-sm font-regular mt-4">
          Seamless Payments, Anytime, Anywhere – Fast!
        </Text>
      </View>

      <StatusBar style="light" />
    </>
  );
};
export default SplashScreen2;
const styles = StyleSheet.create({});
