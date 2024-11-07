import CustomButton from "@/components/CustomButton";
import LoadingOverlay from "@/components/LoadingOverlay";
import { images } from "@/constants";
import { useAuthStore } from "@/context/store/AuthStore";
import { router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const { isLoading } = useAuthStore();
  return (
    <>
      <SafeAreaView className="bg-primary flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <Image
              source={images.splash_1}
              className="max-w-[380px] w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="relative mt-5">
              <Text className="text-4xl text-center font-pbold">
                Enjoy financial success with Privacy and Trust
              </Text>
            </View>
            <Text className="text-xl font-pregular mt-7 text-center ">
              Rely on Our Ultra safe encrypted system to secure your Financial
              Activities
            </Text>

            <View className="my-12 border border-secondary w-6/12"></View>

            <CustomButton
              title="Continue with Email"
              handlePress={() => router.navigate("/sign-in")}
              containerStyles="w-full"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      {isLoading && <LoadingOverlay />}
    </>
  );
};
export default App;
