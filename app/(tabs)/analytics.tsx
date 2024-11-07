import Header from "@/components/Header";
import { data } from "@/data";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const targetNames = [
  "Electricity",
  "Water",
  "Education",
  "Gas",
  "Mobile",
  "Donation",
];
const colors = ["#16817b", "#5e20f1", "#9d2b2b"];

const shuffleArray = (array: any[]): any[] => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const Analytics = () => {
  const shuffledColors = shuffleArray([...colors]);

  const filteredData = targetNames.map((name, index) => {
    const totalAmount = data
      .filter((item) => item.name === name)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const color = shuffledColors[index % shuffledColors.length];

    return { label: name, value: totalAmount, frontColor: color };
  });

  // console.log(filteredData);

  return (
    <SafeAreaView>
      <View className="bg-primary h-full">
        <Header name={"Analytics"} to={() => router.back()} />
        <View className="flex h-full mt-24 items-center ">
          <Text className="text-center text-gray-500 font-pbold text-3xl">
            COMING SOON...
          </Text>
        </View>

        {/* <View className="flex flex-row items-center gap-2 justify-center">
          <TouchableOpacity>
            <Text className="text-3xl font-psemibold">{"<"}</Text>
          </TouchableOpacity>
          <Text className="font-psemibold">Jan 2024</Text>
          <TouchableOpacity>
            <Text className="text-3xl font-psemibold">{">"}</Text>
          </TouchableOpacity>
        </View>
        <BarChartComponent data={filteredData} />

        <View className="mx-5 my-1 flex flex-row justify-between">
          <Text className="text-lg font-psemibold"> Number of bills: 8</Text>
          <TouchableOpacity>
            <Text className="text-secondary font-psemibold">
              Total bills: KES 2650
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>

      <StatusBar backgroundColor="#d9d9d9" style="dark" />
    </SafeAreaView>
  );
};

export default Analytics;
