import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

const Header = ({
  to,
  name,
}: {
  to: () => void;
  name: string; // The header title to be displayed. It's a string.
}) => {
  return (
    <View className="p-2 mt-4 mb-4 flex flex-row justify-center items-center">
      {to && (
        <TouchableOpacity
          onPress={to}
          activeOpacity={0.7}
          className={`absolute left-5`}
        >
          <Image
            source={icons.arrow_left}
            resizeMode="contain"
            style={{ width: 22, height: 22 }}
          />
        </TouchableOpacity>
      )}

      <Text className="text-2xl text-center font-psemibold">{name}</Text>
    </View>
  );
};

export default Header;
