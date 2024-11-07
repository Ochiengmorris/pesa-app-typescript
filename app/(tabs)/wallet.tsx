import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import WalletCard from "@/components/WalletCard";
import { icons } from "@/constants";
import { Transaction, useAuthStore } from "@/context/store/AuthStore";
import { formatDateInDay } from "@/utils/FormatDate";
import FormatMoney from "@/utils/FormatMoney";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WalletScreen = () => {
  const { user, transactions } = useAuthStore();
  const [filter, setFilter] = useState<string>("today");

  // Memoize the filtered data based on the selected filter and transactions
  const filteredData = useMemo(() => {
    const today = moment().format("YYYY-MM-DD");
    const yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");
    const startOfWeek = moment().startOf("week").format("YYYY-MM-DD");
    const endOfWeek = moment().endOf("week").format("YYYY-MM-DD");
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");

    if (!transactions) return [];

    switch (filter) {
      case "today":
        return transactions.filter(
          (item) => moment(item.transactionDate).format("YYYY-MM-DD") === today
        );
      case "yesterday":
        return transactions.filter(
          (item) =>
            moment(item.transactionDate).format("YYYY-MM-DD") === yesterday
        );
      case "thisWeek":
        return transactions.filter(
          (item) =>
            moment(item.transactionDate).format("YYYY-MM-DD") >= startOfWeek &&
            moment(item.transactionDate).format("YYYY-MM-DD") <= endOfWeek
        );
      case "thisMonth":
        return transactions.filter(
          (item) =>
            moment(item.transactionDate).format("YYYY-MM-DD") >= startOfMonth &&
            moment(item.transactionDate).format("YYYY-MM-DD") <= endOfMonth
        );
      default:
        return transactions;
    }
  }, [filter, transactions]);

  // const handleIcon = (icon) => {
  //   switch (icon) {
  //     case "airtime":
  //       return require("../../../assets/icons/airtime.png");
  //     case "bank":
  //       return require("../../../assets/icons/bank.png");
  //     case "card":
  //       return require("../../../assets/icons/card.png");
  //     case "data":
  //       return require("../../../assets/icons/data.png");
  //     case "mobile":
  //       return require("../../../assets/icons/mobile.png");
  //     case "transfer":
  //       return require("../../../assets/icons/transfer.png");
  //     case "wallet":
  //       return require("../../../assets/icons/wallet.png");
  //     default:
  //       return require("../../../assets/icons/wallet.png");
  //   }
  // };

  const RenderTransactionItem = React.memo(
    ({ item }: { item: Transaction }) => {
      const senderUsername = item.sender?.username || "Unknown Sender";
      return (
        <TouchableOpacity className="mx-5 flex-row justify-between items-center mb-4">
          <View className="flex-row justify-between items-center">
            <View className="border border-gray-600/10 rounded-lg p-1 mr-4">
              <Image
                source={
                  user?.email === item.receiver.email
                    ? icons.receive
                    : icons.send
                }
                resizeMode="contain"
                className="w-9 h-9"
                tintColor={"#752fce"}
              />
            </View>
            <View>
              <Text className="text-xl font-psemibold">
                {user?.email === item.receiver.email
                  ? senderUsername
                  : item.receiver.username}
              </Text>
              <Text className="text-xs text-gray-700 font-plight">
                Payment date {formatDateInDay(item.transactionDate)}
              </Text>
            </View>
          </View>

          <Text
            className={`text-xl font-pregular ${
              item.status === "pending"
                ? "text-yellow-700/60"
                : user?.email === item.receiver.email
                ? "text-green-700/60"
                : "text-red-700/60"
            }`}
          >
            {user?.email === item.receiver.email ? "+" : "-"}
            {FormatMoney(Math.abs(item.amount))} KES
          </Text>
        </TouchableOpacity>
      );
    }
  );

  return (
    <SafeAreaView>
      <View className="bg-primary h-full">
        <Header name={"My Wallet"} to={() => router.back()} />
        <WalletCard setFilter={setFilter} filter={filter} />
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 100 }}
          initialNumToRender={10}
          renderItem={({ item }) => <RenderTransactionItem item={item} />}
          ListEmptyComponent={
            <EmptyState
              title={"No Transactions yet"}
              subTitle={"Start Transacting Now!"}
            />
          }
          showsVerticalScrollIndicator={false}
        />

        <StatusBar backgroundColor="#d9d9d9" style="dark" />
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;
