import { icons } from "@/constants";
import { Routes } from "@/constants/Routes";
import { useAuthStore } from "@/context/store/AuthStore";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const router = useRouter();
  const { logout, user } = useAuthStore();

  const handleLogOut = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#d9d9d9" }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <Image
            source={icons.arrow_left}
            resizeMode="contain"
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <Text style={styles.title} className="text-2xl">
          My Account
        </Text>
      </View>

      <View className="mx-5 mt-5">
        <TouchableOpacity
          activeOpacity={0.5}
          className="bg-white/30 flex-row items-center p-4 gap-4 rounded-xl mb-6"
          onPress={() => router.push(Routes.PROFILE)}
        >
          <Image
            source={icons.user}
            className="w-7 h-7"
            tintColor={"#6b7280"}
          />

          <View className="flex-row items-center justify-between grow">
            <Text className="text-lg text-gray-600 font-psemibold">
              Profile
            </Text>
            <Image
              source={icons.arrow_small_left}
              className="w-6 h-6 rotate-180"
              tintColor={"#6b7280"}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          className="bg-white/30 flex-row items-center p-4 gap-4 rounded-xl mb-6"
          onPress={() => router.push(Routes.PAY_METHODS)}
        >
          <Image
            source={icons.viber}
            className="w-7 h-7"
            tintColor={"#6b7280"}
          />
          <View className="flex-row items-center justify-between grow">
            <Text className="text-lg text-gray-600 font-psemibold">
              Payment Methods
            </Text>
            <Image
              source={icons.arrow_small_left}
              className="w-6 h-6 rotate-180"
              tintColor={"#6b7280"}
            />
          </View>
        </TouchableOpacity>

        <View className="border-b border-gray-900 mb-6" />

        <TouchableOpacity
          activeOpacity={0.5}
          className="bg-white/30 flex-row items-center p-4 gap-4 rounded-xl mb-6"
          onPress={() => router.push(Routes.SETTINGS)}
        >
          <Image
            source={icons.email}
            className="w-7 h-7"
            tintColor={"#6b7280"}
          />
          <View className="flex-row items-center justify-between grow">
            <Text className="text-lg text-gray-600 font-psemibold">
              Settings
            </Text>
            <Image
              source={icons.arrow_small_left}
              className="w-6 h-6 rotate-180"
              tintColor={"#6b7280"}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          className="bg-white/30 flex-row items-center p-4 gap-4 rounded-xl mb-6"
          onPress={() => router.push(Routes.PRIVACY_POLICY)}
        >
          <Image
            source={icons.lock}
            className="w-7 h-7"
            tintColor={"#6b7280"}
          />

          <View className="flex-row items-center justify-between grow">
            <Text className="text-lg text-gray-600 font-psemibold">
              Privacy Policy
            </Text>
            <Image
              source={icons.arrow_small_left}
              className="w-6 h-6 rotate-180"
              tintColor={"#6b7280"}
            />
          </View>
        </TouchableOpacity>

        <View className="border-b border-gray-900 mb-6" />

        <TouchableOpacity
          activeOpacity={0.5}
          className="bg-white/30 flex-row items-center p-4 gap-4 rounded-xl mb-6"
          onPress={() => router.push(Routes.CUSTOMER_SUPPORT)}
        >
          <Image
            source={icons.email}
            className="w-7 h-7"
            tintColor={"#6b7280"}
          />
          <View className="flex-row items-center justify-between grow">
            <Text className="text-lg text-gray-600 font-psemibold">
              Customer Support
            </Text>
            <Image
              source={icons.arrow_small_left}
              className="w-6 h-6 rotate-180"
              tintColor={"#6b7280"}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          className="bg-white/30 flex-row items-center p-4 gap-4 rounded-xl mb-6"
          onPress={handleLogOut}
        >
          <Image
            source={icons.logout}
            className="w-7 h-7"
            tintColor={"#dc2626"}
          />
          <Text className="text-lg font-psemibold text-[#dc2626]">Log Out</Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor="#d9d9d9" style="dark" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    marginTop: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  title: {
    fontWeight: "500",
    textAlign: "center",
    width: "100%",
    fontFamily: "Poppins-SemiBold",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 24,
    gap: 16,
    borderRadius: 10,
    // shadowColor: "#752fce",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
});

export default Profile;
