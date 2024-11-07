import Header from "@/components/Header";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const PolicyPage = () => {
  return (
    <SafeAreaView>
      <View className="bg-primary h-full">
        <Header name={"Privacy Policy"} to={() => router.back()} />
        <View className="flex h-full mt-24 items-center ">
          <Text className="text-center text-gray-500 font-pbold text-3xl">
            COMING SOON...
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default PolicyPage;
