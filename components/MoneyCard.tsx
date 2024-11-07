import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

const MoneyCard = () => {
  return (
    <View className="mx-5 mb-4 bg-secondary-200 border border-accent-100/10 flex flex-row justify-between px-4 py-8 rounded-2xl">
      <View className=" flex justify-center items-center">
        <TouchableOpacity
          className="bg-primary p-4 rounded-xl"
          onPress={() => router.push("/transactions/send-money")}
        >
          <Image
            source={icons.money_out}
            resizeMode="contain"
            className="w-12 h-12"
            tintColor={"#752fce"}
          />
        </TouchableOpacity>
        <Text className="font-psemibold mt-2 text-lg text-gray-900/50">
          Send
        </Text>
      </View>

      <View className=" flex justify-center items-center">
        <TouchableOpacity
          className="bg-primary p-4 rounded-xl"
          onPress={() => router.push("/transactions/request-money")}
        >
          <Image
            source={icons.money_in}
            resizeMode="contain"
            className="w-12 h-12"
            tintColor={"#752fce"}
          />
        </TouchableOpacity>
        <Text className="font-psemibold mt-2 text-lg text-gray-900/50">
          Request
        </Text>
      </View>

      <View className=" flex justify-center items-center">
        <TouchableOpacity className="bg-primary p-4 rounded-xl">
          <Image
            source={icons.money_save}
            resizeMode="contain"
            className="w-12 h-12"
            tintColor={"#752fce"}
          />
        </TouchableOpacity>
        <Text className="font-psemibold mt-2 text-lg text-gray-900/50">
          Loan
        </Text>
      </View>

      <View className=" flex justify-center items-center">
        <TouchableOpacity
          className="bg-primary p-4 rounded-xl"
          onPress={() => router.push("/transactions/top-up")}
        >
          <Image
            source={icons.money_add}
            resizeMode="contain"
            className="w-12 h-12"
            tintColor={"#752fce"}
          />
        </TouchableOpacity>
        <Text className="font-psemibold mt-2 text-lg text-gray-900/50">
          Top Up
        </Text>
      </View>
    </View>
  );
};

export default MoneyCard;
