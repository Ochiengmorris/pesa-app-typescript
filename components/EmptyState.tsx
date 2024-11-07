import { images } from "@/constants";
import { Image, Text, View } from "react-native";

type EmptyProps = {
  title: string;
  subTitle: string;
};

const EmptyState = ({ title, subTitle }: EmptyProps) => {
  return (
    <View className="justify-center items-center mt-8 px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[215px]"
      />
      <Text className="mt-4 text-xl font-psemibold text-center">{title}</Text>
      <Text className="mt-2 text-sm text-gray-600 font-pmedium text-center">
        {subTitle}
      </Text>
    </View>
  );
};
export default EmptyState;
