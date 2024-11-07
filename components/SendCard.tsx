import { useAuthStore } from "@/context/store/AuthStore";
import FormatMoney from "@/utils/FormatMoney";
import React from "react";
import { Text, View } from "react-native";
import MoneyCard from "./MoneyCard";

const SendCard = () => {
  const { user } = useAuthStore();
  return (
    <View>
      <View className="mx-5 mb-4 flex flex-row justify-between items-center">
        <View className="">
          <Text className="font-psemibold text-3xl">
            Hello {user?.username},
          </Text>
          <Text className="font-psemibold text-gray-600/60">
            Your available balance
          </Text>
        </View>
        <Text className="text-3xl font-psemibold">
          KSH {FormatMoney(user?.balance)}
        </Text>
      </View>

      <MoneyCard />
    </View>
  );
};

export default SendCard;
