import EmptyState from "@/components/EmptyState";
import FullPageModal from "@/components/FullPageModal";
import MoneyCard from "@/components/MoneyCard";
import { icons, images } from "@/constants";
import { Transaction, useAuthStore } from "@/context/store/AuthStore";
import LoadNotification from "@/hooks/LoadNotifications";
import { formatDate } from "@/utils/FormatDate";
import FormatMoney from "@/utils/FormatMoney";
import { router, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const HomePage = () => {
  const { user, fetchData, transactions, setExpoPushToken } = useAuthStore();
  const segments = useSegments();
  const [isHome, setIsHome] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();

  const route = segments.join("/");
  useEffect(() => {
    setIsHome(route === "(tabs)/home");
  }, [route]);

  LoadNotification({ setExpoPushToken });

  const filteredData = useMemo(() => {
    const today = moment().format("YYYY-MM-DD");
    const yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");

    if (!transactions) return [];

    return transactions.filter(
      (item) =>
        moment(item.transactionDate).format("YYYY-MM-DD") === today ||
        moment(item.transactionDate).format("YYYY-MM-DD") === yesterday
    );
  }, [transactions]);

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
    <View className="bg-primary h-full relative">
      <View className="bg-secondary pt-[50px] flex flex-row items-center justify-between pb-32 px-5 ">
        {/* User balance and profile */}
        <View className="flex flex-row items-center">
          <TouchableOpacity
            onPress={() => router.push("/profile/my-profile")}
            className="w-16 h-16 rounded-full mr-4 overflow-hidden"
          >
            <Image
              source={images.profile_male}
              resizeMode="cover"
              className="w-full h-full"
            />
          </TouchableOpacity>
          <View className="flex gap-1">
            <Text className="text-gray-200/90 text-lg font-pregular">
              Total Balance
            </Text>
            <Text className="text-gray-100 text-3xl font-psemibold">
              KES {FormatMoney(user?.balance)}
            </Text>
          </View>
        </View>

        <View className=" p-2 bg-primary rounded-full">
          <Image
            source={icons.notification}
            resizeMode="contain"
            className="w-8 h-8"
          />
        </View>
      </View>

      <View className="absolute top-[123px] mx-auto w-full pt-4  ">
        <MoneyCard />
      </View>

      <View className="mt-28">
        <View className="mx-5 mb-2 flex flex-row justify-between">
          <Text className="text-lg font-psemibold"> Popular services</Text>
          <TouchableOpacity>
            <Text className="text-secondary font-psemibold">View all</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row mb-4 mx-5 justify-center">
          <TouchableOpacity
            className="py-4 px-2 rounded-lg flex justify-center items-center gap-2"
            onPress={() => router.push("/bills")}
          >
            <View className="bg-secondary-200 p-4 rounded-full">
              <Image
                source={icons.smartphone}
                resizeMode="contain"
                className="w-10 h-10"
                tintColor={"#752fce"}
              />
            </View>
            <Text className="font-psemibold">Mobile</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-4 px-2 rounded-lg flex justify-center items-center gap-2">
            <View className="bg-secondary-200 p-4 rounded-full">
              <Image
                source={icons.light_bulb}
                resizeMode="contain"
                className="w-10 h-10"
                tintColor={"#752fce"}
              />
            </View>
            <Text className="font-psemibold">Eletricity</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-4 px-2 rounded-lg flex justify-center items-center gap-2">
            <View className="bg-secondary-200 p-4 rounded-full">
              <Image
                source={icons.kindness}
                resizeMode="contain"
                className="w-10 h-10"
                tintColor={"#752fce"}
              />
            </View>
            <Text className="font-psemibold">Charity</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-4 px-2 rounded-lg flex justify-center items-center gap-2">
            <View className="bg-secondary-200 p-4 rounded-full">
              <Image
                source={icons.gas2}
                resizeMode="contain"
                className="w-10 h-10"
                tintColor={"#752fce"}
              />
            </View>
            <Text className="font-psemibold">Gas</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-4 px-2 rounded-lg flex justify-center items-center gap-2">
            <View className="bg-secondary-200 p-4 rounded-full">
              <Image
                source={icons.water_drop}
                resizeMode="contain"
                className="w-10 h-10"
                tintColor={"#752fce"}
              />
            </View>
            <Text className="font-psemibold">Water</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mx-5 mb-2 flex flex-row justify-between">
        <Text className="text-lg font-psemibold"> Recent Transaction</Text>
        <TouchableOpacity
          onPress={() => router.push("/transactions/transaction-history")}
        >
          <Text className="text-secondary font-psemibold">View all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => {
          const senderUsername = item.sender?.username || "Unknown Sender";
          return (
            <TouchableOpacity
              activeOpacity={0.5}
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

      {/* FullPageModal showing selected transaction */}
      {selectedTransaction && (
        <FullPageModal
          data={selectedTransaction} // Pass the selected transaction
          user={user}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      {isHome && <StatusBar style="light" />}
    </View>
  );
};
export default HomePage;
