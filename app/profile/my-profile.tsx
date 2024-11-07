import Header from "@/components/Header";
import { images } from "@/constants";
import { useAuthStore } from "@/context/store/AuthStore";
import { formatDate } from "@/utils/FormatDate";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyProfile = () => {
  const { user } = useAuthStore();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#d9d9d9" }}>
      <Header name={"Your Profile"} to={() => router.back()} />

      <View className="flex items-center mt-1 ">
        <Image
          source={images.profile_male}
          resizeMode="cover"
          className="w-[150px] h-[150px] rounded-full"
        />
      </View>

      {user?.isVerified ? (
        <View className="mt-2  flex items-center justify-center ">
          <View className="bg-green-200 px-4 py-1 rounded-xl">
            <Text className="text-center font-psemibold">Verified</Text>
          </View>
        </View>
      ) : (
        <View className="mt-2  flex items-center justify-center ">
          <View className="bg-red-200 px-4 py-1 rounded-xl">
            <Text>Not Verified</Text>
          </View>
        </View>
      )}

      <View className="mx-5 mt-5">
        <View className={`space-y-2 `}>
          <Text className="text-base mb-2 text-gray-700 font-pmedium">
            Name
          </Text>
          <View className="w-full h-16 px-4 bg-secondary/5 rounded-2xl items-center flex-row">
            <View className="flex-1 placeholder:text-gray-600/30">
              <Text className="text-black font-psemibold text-base">
                {user?.username}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="mx-5 mt-5">
        <View className={`space-y-2 `}>
          <Text className="text-base mb-2 text-gray-700 font-pmedium">
            Phone Number
          </Text>
          <View className="w-full h-16 px-4 bg-secondary/5 rounded-2xl items-center flex-row">
            <View className="flex-1 placeholder:text-gray-600/30">
              <Text className="text-black font-psemibold text-base">
                {user?.phone}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="mx-5 mt-5">
        <View className={`space-y-2 `}>
          <Text className="text-base mb-2 text-gray-700 font-pmedium">
            Email
          </Text>
          <View className="w-full h-16 px-4 bg-secondary/5 rounded-2xl items-center flex-row">
            <View className="flex-1 placeholder:text-gray-600/30">
              <Text className="text-black font-psemibold text-base">
                {user?.email}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="mx-5 mt-5">
        <View className={`space-y-2 `}>
          <Text className="text-base mb-2 text-gray-700 font-pmedium">
            Updated At
          </Text>
          <View className="w-full h-16 px-4 bg-secondary/5 rounded-2xl items-center flex-row">
            <View className="flex-1 placeholder:text-gray-600/30">
              <Text className="text-black font-psemibold text-base">
                {formatDate(user?.updatedAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default MyProfile;
const styles = StyleSheet.create({});
