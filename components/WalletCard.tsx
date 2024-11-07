import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SendCard from "./SendCard";

const WalletCard = ({
  setFilter,
  filter,
}: {
  setFilter: (filter: string) => void;
  filter: string;
}) => {
  const handleViewAll = () => {
    try {
      router.navigate("/transactions/transaction-history");
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };
  return (
    <View>
      <SendCard />

      <View className="mx-5 my-1 flex flex-row justify-between">
        <Text className="text-lg font-psemibold"> Last Transactions</Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text className="text-secondary font-psemibold">View all</Text>
        </TouchableOpacity>
      </View>
      <View className="mx-5 flex-row p-1 justify-between mb-4">
        <TouchableOpacity
          onPress={() => setFilter("today")}
          className={`${
            filter === "today" ? "bg-secondary" : "bg-gray-200"
          } p-2  rounded-lg`}
        >
          <Text
            className={`font-psemibold ${
              filter === "today" ? "text-white" : "text-gray-500"
            }`}
          >
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("yesterday")}
          className={` ${
            filter === "yesterday" ? "bg-secondary" : "bg-gray-200"
          } p-2  rounded-lg`}
        >
          <Text
            className={`font-psemibold ${
              filter === "yesterday" ? "text-white" : "text-gray-500"
            }`}
          >
            Yesterday
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("thisWeek")}
          className={`${
            filter === "thisWeek" ? "bg-secondary" : "bg-gray-200"
          } p-2  rounded-lg`}
        >
          <Text
            className={`font-psemibold ${
              filter === "thisWeek" ? "text-white" : "text-gray-500"
            }`}
          >
            This week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("thisMonth")}
          className={`${
            filter === "thisMonth" ? "bg-secondary" : "bg-gray-200"
          } p-2  rounded-lg`}
        >
          <Text
            className={`font-psemibold ${
              filter === "thisMonth" ? "text-white" : "text-gray-500"
            }`}
          >
            This month
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WalletCard;
