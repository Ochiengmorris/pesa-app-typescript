import { icons } from "@/constants";
import { Routes } from "@/constants/Routes";
import { router, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
const VerifyEmail = () => {
  const segments = useSegments();
  const [isVerify, setIsVerify] = useState(false);

  const route = segments.join("/");
  useEffect(() => {
    if (route === "(auth)/verify-email") {
      setIsVerify(true);
    } else {
      setIsVerify(false);
    }
  }, [route]);
  return (
    <View className="flex-1 bg-secondary">
      <View className="p-2 mt-14 mb-4 flex flex-row justify-center items-center">
        <TouchableOpacity
          onPress={() => router.replace("/")}
          activeOpacity={0.7}
          className={`absolute right-5`}
        >
          <Text className="text-gray-200 font-pmedium">Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="mt-24">
        <View className="mb-4 mx-4">
          <Text className="text-4xl text-center text-gray-200 font-psemibold">
            Verify Your Email
          </Text>
        </View>
        <View className="mb-4 mx-4">
          <Text className="text-md text-gray-200/50 text-center font-pmedium">
            A verification code was sent to your email address. Please check
            your inbox and continue.
          </Text>
        </View>

        <View className="justify-center items-center flex px-auto mb-4">
          <Image
            source={icons.paper_plane}
            tintColor={"#e5e7eb"}
            resizeMode="contain"
            className="w-[350px] h-[350px]"
          />
        </View>

        <View className="mb-4 mx-4 flex gap-6">
          <TouchableOpacity
            onPress={() => router.push(Routes.OTP_VERIFICATION)}
            activeOpacity={0.7}
            className={` bg-[#e5e7eb] rounded-xl min-h-[62px] justify-center items-center`}
            disabled={false}
          >
            <Text className={`text-secondary font-pextrabold text-xl`}>
              Continue
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/")}
            activeOpacity={0.7}
            className={` bg-[#e5e7eb]/20 rounded-xl min-h-[62px] justify-center items-center`}
            disabled={true}
          >
            <Text
              className={`text-[#e5e7eb] font-pextrabold underline text-xl`}
            >
              Resend email
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isVerify && <StatusBar style="light" />}
    </View>
  );
};
export default VerifyEmail;
