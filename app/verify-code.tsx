import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useAlert } from "@/context/AlertProvider";
import { useAuthStore } from "@/context/store/AuthStore";

import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VerifyCode = () => {
  const { user, verifyEmail, isLoading } = useAuthStore();
  const { showAlert, hideAlert } = useAlert();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (text: string, index: number) => {
    let newOtp = [...otp];

    const allFilled = newOtp.every((digit) => digit !== "");
    if (allFilled) {
      return;
    }

    // Handle paste events
    if (text.length > 1) {
      const pastedText = text.slice(0, 6).split("");
      for (let i = 0; i < pastedText.length; i++) {
        newOtp[i] = pastedText[i] || "";
      }
      setOtp(newOtp);

      const lastFilledIndex = newOtp.findLastIndex((digit) => digit !== "");
      const focusIndex = Math.min(lastFilledIndex + 1, 5);
      inputRefs.current[focusIndex]?.focus();
    } else {
      // Handle single character input
      newOtp[index] = text;
      setOtp(newOtp);

      // Move focus to the next input if the current one is filled
      if (text && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handlePressSubmit();
    }
  }, [otp]);

  const handleKeypress = (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePressSubmit = async () => {
    const verificationCode = otp.join("");

    if (!verificationCode) {
      showAlert(
        "Error",
        "Please enter verification code",
        "Dismiss",
        "Please enter",
        hideAlert
      );
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await verifyEmail(verificationCode);
      if (result.status === "SUCCESS") {
        router.replace("/home");
      } else {
        showAlert(
          "Error",
          result?.message?.message || "Something went wrong. Please try again.",
          "Retry",
          "Retry",
          hideAlert
        );
        // Clear OTP and focus on the first input on error
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
      setOtp(["", "", "", "", "", ""]);
    }
  };

  return (
    <>
      <SafeAreaView>
        <View className="bg-primary h-full">
          <Header to={() => router.back()} name={""} />

          <ScrollView className="mt-20">
            <View className="mb-4 mx-4">
              <Text className="text-4xl text-center text-gray-700 font-psemibold">
                Email Verification
              </Text>
            </View>
            <View className="mb-4 mx-4">
              <Text className="text-md text-gray-700/50 text-center font-pmedium">
                Enter the code sent to{" "}
                <Text className="text-secondary/90 font-psemibold">
                  {user?.email}
                </Text>
              </Text>
            </View>

            <View className="flex-row justify-evenly mt-8 mx-4 mb-6">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  keyboardType="numeric"
                  ref={(el) => (inputRefs.current[index] = el)}
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeypress(index, e)}
                  className="border border-gray-300 bg-secondary/10 font-pmedium w-16 h-16 text-center text-lg rounded-lg"
                />
              ))}
            </View>

            <View className="mt-16 mb-4 mx-4">
              <CustomButton
                title={"Verify"}
                handlePress={handlePressSubmit}
                isLoading={isSubmitting}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      {isLoading && <LoadingOverlay />}
    </>
  );
};
export default VerifyCode;
