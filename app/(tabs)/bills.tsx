import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

const Bills = () => {
  return (
    <SafeAreaView>
      <View className="bg-primary h-full">
        <Header name={"Bills"} to={() => router.back()} />
        <View className="flex h-full mt-24 items-center ">
          <Text className="text-center text-gray-500 font-pbold text-3xl">
            COMING SOON...
          </Text>
        </View>
      </View>
      <StatusBar backgroundColor="#d9d9d9" style="dark" />
    </SafeAreaView>
  );
};

export default Bills;
