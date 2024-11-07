import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useAlert } from "@/context/AlertProvider";
import { Transaction, useAuthStore } from "@/context/store/AuthStore";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sampleData = [
  {
    id: 1,
    name: "Oduya",
    number: "0742642356",
    image: require("../../assets/images/profile-male.jpg"),
  },
  {
    id: 2,
    name: "Beryl",
    number: "0787654321",
    image: require("../../assets/images/profile-female.jpg"),
  },
  {
    id: 3,
    name: "Bruno",
    number: "0712345678",
    image: require("../../assets/images/profile-male.jpg"),
  },
];
const RequestMoney = () => {
  const { requestMoney, isLoading } = useAuthStore();
  const [amount, setAmount] = useState("");
  const [contact, setContact] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const [filteredData, setFilteredData] = useState(sampleData);
  const [Submitting, setSubmitting] = useState(false);

  useEffect(() => {
    filterData();
  }, [contact]);

  const filterData = () => {
    const filtered = sampleData.filter((item) => item.number.includes(contact));
    setFilteredData(filtered.length ? filtered : sampleData);
  };

  const handleRequestMoney = async () => {
    const parsedAmount = parseFloat(amount) || 0;

    if (contact.toString() === "") {
      showAlert("Error", "Please enter a valid contact number.");
      return;
    }
    if (parsedAmount <= 0) {
      showAlert("Error", "Please enter a valid amount.");
      return;
    }

    setSubmitting(true);
    await requestMoney({ amount: parsedAmount, senderPhone: contact })
      .then((response) => {
        if (response.status === "SUCCESS") {
          handleNavigation({
            message: response.data.message,
            transaction: response.data.transaction,
          });
          setAmount("");
          setContact("");
        } else {
          showAlert(
            "Error",
            response?.message?.message ||
              "Something went wrong. Please try again.",
            "Dismiss",
            "Retry",
            hideAlert
          );
        }
      })
      .catch((error) => {
        console.error("Transaction error:", error);
        showAlert("Error", "Something went wrong. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleNavigation = ({
    message,
    transaction,
  }: {
    message: string;
    transaction: Transaction;
  }) => {
    // Pass parameters in the URL
    router.replace({
      pathname: "/transactions/success-transaction",
      params: { transaction: JSON.stringify(transaction), message },
    });
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Header name={"Request Money"} to={() => router.back()} />

            <View className={`space-y-2 mx-4 mt-7`}>
              <Text className="mb-2 text-gray-700 text-lg font-pmedium">
                Contact
              </Text>
              <TextInput
                className="p-4 rounded-2xl bg-primary border border-gray-500/30 flex-row font-pregular text-xl text-secondary focus:border-secondary/80"
                value={contact}
                placeholder={"Enter phone number"}
                onChangeText={(ev) => setContact(ev)}
                keyboardType="phone-pad"
              />
            </View>

            <View className="mx-5 mb-2 mt-8 flex flex-row justify-between">
              <Text className="text-lg font-psemibold"> Recent</Text>
              <TouchableOpacity>
                <Text className="text-secondary font-psemibold">
                  See All Contacts
                </Text>
              </TouchableOpacity>
            </View>

            {/* flatlist */}
            <View className="border h-fit mt-2 border-gray-500/30 mx-5 rounded-xl">
              {filteredData.slice(0, 3).map((item) => (
                <TouchableOpacity
                  key={item.id.toString()}
                  className="flex flex-row items-center gap-4 p-2 border-b border-gray-500/20"
                  onPress={() => setContact(item.number)}
                >
                  <Image
                    source={item.image}
                    className="w-12 h-12 rounded-full"
                  />
                  <View>
                    <Text className="text-md font-psemibold">{item.name}</Text>
                    <Text className="text-sm font-plight">{item.number}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View className={`space-y-2 mx-4 mt-7`}>
              <Text className="mb-2 text-gray-700 text-xl font-psemibold">
                Set Amount
              </Text>
              <Text className="mb-2 text-gray-700 text-sm font-plight">
                How much would you like to request?
              </Text>
              <TextInput
                className="text-center mx-4 p-4 border-b-2 border-gray-500/30 flex-row font-psemibold text-2xl text-secondary focus:border-gray-500/80"
                value={amount}
                placeholder={"0"}
                onChangeText={(ev) => {
                  // Only allow numeric input, but keep it as a string until we validate
                  const numericValue = ev.replace(/[^0-9.]/g, ""); // Allow only numbers and decimal points
                  setAmount(numericValue);
                }}
                keyboardType="numeric"
              />
            </View>

            <CustomButton
              title={Submitting ? "Requesting..." : "Request"}
              containerStyles={"mx-5 mt-12"}
              handlePress={handleRequestMoney}
              isLoading={Submitting}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
      {isLoading && <LoadingOverlay />}
    </>
  );
};

export default RequestMoney;
