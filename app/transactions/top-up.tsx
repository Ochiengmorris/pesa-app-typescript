import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useAlert } from "@/context/AlertProvider";
import { useAuthStore } from "@/context/store/AuthStore";
import { router } from "expo-router";

const TopUp = () => {
  const { showAlert, hideAlert } = useAlert();
  const { deposit, isLoading } = useAuthStore();
  const [amount, setAmount] = useState("");
  const [fees, setFees] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isAboveFifty, setIsAboveFifty] = useState(false);

  useEffect(() => {
    const parsedAmount = parseFloat(amount) || 0;
    let calculatedFees = 0;
    if (parsedAmount > 50) {
      setIsAboveFifty(true);
    } else {
      setIsAboveFifty(false);
    }
    if (parsedAmount > 100) {
      calculatedFees = 0.025 * parsedAmount;
    }
    setFees(calculatedFees);
    setTotalAmount(parsedAmount + calculatedFees);
  }, [amount]);

  const handleTopUp = async () => {
    const parsedAmount = parseFloat(amount) || 0;
    if (parsedAmount <= 0) {
      showAlert(
        "Error",
        "Please fill in an amount",
        "Dismiss",
        "Error",
        hideAlert
      );
      return;
    }

    if (isAboveFifty) {
      try {
        const response = await deposit({ amount: parsedAmount });
        if (response.status === "SUCCESS") {
          showAlert(
            "Success",
            "Top-Up successful.",
            "Dismiss",
            "Error",
            hideAlert
          );
          setAmount("");
          router.navigate("/home");
        } else {
          Alert.alert("Error", "Failed to top-up. Please try again later.");
          showAlert(
            "Error",
            response?.message?.message ||
              "Failed to top-up. Please try again later.",
            "Dismiss",
            "Error",
            hideAlert
          );
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <Header name={"Top-up"} to={() => router.back()} />

        <View className={`space-y-2 mx-4 mt-7`}>
          <Text className="mb-2 text-gray-700 font-psemibold">Amount</Text>
          {/* <View className=" border w-full h-16  bg-primary rounded-2xl focus:border-secondary items-center flex-row"> */}
          <TextInput
            className="text-center p-4 rounded-2xl bg-primary border border-gray-500/30 flex-row justify-center items-center font-psemibold text-2xl text-secondary focus:border-secondary/80"
            value={amount.toString()}
            placeholder={"0"}
            placeholderTextColor={"#7b7b8b"}
            onChangeText={(ev) => {
              // Only allow numeric input, but keep it as a string until we validate
              const numericValue = ev.replace(/[^0-9.]/g, ""); // Allow only numbers and decimal points
              setAmount(numericValue);
            }}
            keyboardType="numeric"
          />
          {/* </View> */}
        </View>

        <View className="border border-gray-400/40 rounded-2xl px-4 py-2 mx-4 mt-4">
          <View className="flex flex-row justify-between py-4">
            <Text className="font-psemibold text-lg">Service value</Text>
            <Text className="font-psemibold text-xl">{amount} KES</Text>
          </View>
          <View className="flex flex-row justify-between py-4 border-b border-gray-400/40">
            <Text className="font-psemibold text-lg">Fees</Text>
            <Text className="font-psemibold text-xl">{fees} KES</Text>
          </View>
          <View className="flex flex-row justify-between py-4">
            <Text className="font-psemibold text-lg">Total Amount</Text>
            <Text className="font-psemibold text-xl">{totalAmount} KES</Text>
          </View>
        </View>

        <Text className="text-center text-sm mt-4 mx-4 font-psemibold text-gray-700">
          Please note that you will receive a 2.5% service fee on the top-up
          amount.
        </Text>

        {!isAboveFifty && (
          <Text className="text-center text-sm mt-4 font-psemibold text-red-700">
            Minimum amount entry is KES 50
          </Text>
        )}

        <CustomButton
          containerStyles={"m-4 "}
          title={`Pay ${totalAmount} KES`}
          handlePress={handleTopUp}
          isLoading={isLoading}
        />
      </KeyboardAvoidingView>
      {isLoading && <LoadingOverlay />}
    </SafeAreaView>
  );
};

export default TopUp;
