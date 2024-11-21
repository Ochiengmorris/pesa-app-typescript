import { Transaction, useAuthStore } from "@/context/store/AuthStore";
import FormatMoney from "@/utils/FormatMoney";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EmptyState from "../../components/EmptyState";
import FullPageModal from "../../components/FullPageModal";
import Header from "../../components/Header";
import { icons } from "../../constants";

import { formatDate } from "../../utils/FormatDate";

const AllTransactions = () => {
  const { user, fetchData, transactions } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();

  const filteredData = transactions || [];

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } catch (error) {
      console.error("Failed to refresh data:", error);
    }
    setRefreshing(false);
  };

  const handleTransactionPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  return (
    <SafeAreaView>
      <View className="bg-primary h-full pt-8">
        <Header name={"All Transactions"} to={() => router.back()} />

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={({ item }) => {
            const senderUsername = item.sender?.username || "Unknown Sender";
            return (
              <TouchableOpacity
                className="mx-5 flex-row justify-between items-center mb-4"
                onPress={() => handleTransactionPress(item)}
              >
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
                      tintColor={"#66488d"}
                    />
                  </View>
                  <View>
                    <Text className="text-xl font-psemibold">
                      {user?.email === item.receiver.email
                        ? senderUsername
                        : item.receiver.username}
                    </Text>
                    <Text className="text-xs text-gray-700 font-plight">
                      Payment date {formatDate(item.transactionDate)}
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
          }}
          ListEmptyComponent={
            <EmptyState
              title={"No Transactions yet"}
              subTitle={"Start Transacting Now!"}
            />
          }
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>

      {/* FullPageModal showing selected transaction */}
      {selectedTransaction && (
        <FullPageModal
          user={user}
          data={selectedTransaction}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </SafeAreaView>
  );
};
export default AllTransactions;
