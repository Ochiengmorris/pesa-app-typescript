import Header from "@/components/Header";
import { formatDate } from "@/utils/FormatDate";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Success = () => {
  const { transaction, message } = useLocalSearchParams();
  const parsedTransaction = JSON.parse(transaction.toString());

  return (
    <>
      <SafeAreaView>
        <View className="bg-primary h-full">
          <Header
            name={"Succesful Transaction"}
            to={() => router.replace("/home")}
          />

          <View className="flex my-auto bg-secondary-100/50 mx-5 px-5 py-7 rounded-xl">
            <View className="flex justify-center items-center">
              <LottieView
                source={require("../../assets/animations/success.json")}
                loop={false}
                autoPlay
                style={{ width: 150, height: 150 }}
                speed={1}
              />
            </View>

            <Text className="text-center text-base font-psemibold">
              {message}
            </Text>

            <Text className="mt-5 text-center font-pbold text-3xl">
              {parsedTransaction.amount}{" "}
              <Text className="text-secondary">KES</Text>
            </Text>

            <View className="mt-5 border-2 flex rounded-lg border-gray-400/30">
              <View className="flex gap-4 flex-row p-2 border-b border-gray-400/30">
                <View className="border p-4 rounded-lg border-secondary">
                  <Ionicons name="wallet-outline" size={32} color={"#ffa729"} />
                </View>
                <View>
                  <Text className="text-sm font-psemibold text-gray-700/60">
                    From
                  </Text>
                  <Text className="font-psemibold">
                    {parsedTransaction.sender.email}
                  </Text>
                  <Text className="font-pregular text-gray-700/60">
                    Account 1234
                  </Text>
                </View>
              </View>

              <View className="flex gap-4 flex-row p-2">
                <View className="border p-4 rounded-lg border-secondary">
                  <FontAwesome name="bank" size={32} color="#ffa729" />
                </View>
                <View>
                  <Text className="text-sm font-psemibold text-gray-700/60">
                    To
                  </Text>
                  <Text className="font-psemibold">
                    {parsedTransaction.receiver.email}
                  </Text>
                  <Text className="font-pregular text-gray-700/60">
                    Asseres Wallet
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex gap-4 p-2 border rounded-lg mt-4 border-gray-400/30">
              <View className="p-2 border-b flex flex-row justify-between border-gray-400/30">
                <Text className="font-pmedium text-gray-700/60">Date</Text>
                <Text className="font-psemibold">
                  {formatDate(parsedTransaction.transactionDate)}
                </Text>
              </View>

              <View className="p-2 flex justify-between flex-row">
                <Text className="font-pmedium text-gray-700/60">Reference</Text>
                <Text className="font-psemibold">
                  {parsedTransaction.referenceId}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <StatusBar backgroundColor="#d9d9d9" style="dark" />
    </>
  );
};
export default Success;
