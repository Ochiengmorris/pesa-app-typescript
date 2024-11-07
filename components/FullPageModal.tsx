import CustomButton from "@/components/CustomButton";
import LoadingOverlay from "@/components/LoadingOverlay";
import { images } from "@/constants";
import { Transaction, useAuthStore, User } from "@/context/store/AuthStore";
import { formatDate } from "@/utils/FormatDate";
import FormatMoney from "@/utils/FormatMoney";
import React from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ModalProps = {
  data: Transaction;
  user: User | null;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

export default function FullPageModal({
  data,
  user,
  modalVisible,
  setModalVisible,
}: ModalProps) {
  const { isLoading, approveTransaction, rejectTransaction } = useAuthStore();

  const handleAccept = async () => {
    // Logic to accept the transaction
    try {
      const response = await approveTransaction({
        transactionId: data._id,
      });
      // console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setModalVisible(false);
    }
  };

  const handleReject = async () => {
    // Logic to reject the transaction
    try {
      const response = await rejectTransaction({
        transactionId: data._id,
      });
      // console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setModalVisible(false);
    }
  };

  const senderUsername = data.sender?.username || "Unknown Sender";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="h-full bg-secondary-100">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex p-6" style={{ flex: 1 }}>
            {/* Close Button */}
            <View className="flex items-end w-full">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="font-pbold text-gray-600">Close</Text>
              </TouchableOpacity>
            </View>

            {/* Transaction Info */}
            <View className="flex items-center gap-2 mt-14">
              <Text className="font-psemibold">
                You {user?.email === data.receiver.email ? "Received" : "Sent"}{" "}
                :
              </Text>
              <View className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  source={images.profile_male}
                  resizeMode="cover"
                  className="w-full h-full"
                />
              </View>
              <Text className="font-psemibold text-3xl">
                {FormatMoney(data.amount)}.00 KES
              </Text>
              <View className="px-3 py-1 rounded-xl bg-green-200/40">
                <Text className="font-pmedium text-green-700">
                  {data.status}
                </Text>
              </View>
            </View>

            {/* Details Section */}
            <View className="mt-5 bg-secondary-200 flex gap-6 px-4 pt-6 pb-4 rounded-xl">
              {[
                { label: "Type", value: "Send Money" },
                { label: "From", value: senderUsername },
                { label: "To", value: data.receiver.email },
                { label: "Transaction ID", value: data.referenceId },
                { label: "Date", value: formatDate(data.transactionDate) },
                { label: "Status", value: data.status },
              ].map((item, index) => (
                <View
                  key={index}
                  className="flex flex-row items-center justify-between"
                >
                  <Text className="font-pmedium text-gray-500">
                    {item.label}:
                  </Text>
                  <Text className="font-pmedium text-gray-500">
                    {item.value}
                  </Text>
                </View>
              ))}

              {/* Accept/Reject Buttons for Pending Transactions */}
              {data?.status === "pending" &&
                user?.username === senderUsername && (
                  <View className="mt-4 space-y-2 flex-row gap-4">
                    <TouchableOpacity
                      onPress={handleReject}
                      className="flex-1 flex-row items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500"
                    >
                      <Text className="font-pmedium text-white">Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleAccept}
                      className="flex-1 flex-row items-center justify-center gap-2 px-4 py-2 rounded-xl bg-green-500"
                    >
                      <Text className="font-pmedium text-white">Accept</Text>
                    </TouchableOpacity>
                  </View>
                )}

              {/* Share Receipt Button */}
              <View className="mt-6">
                <CustomButton
                  handlePress={() => console.log("Share Receipt")}
                  title={"Share receipt"}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {isLoading && <LoadingOverlay />}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)", // Makes background dark and transparent
  },
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
