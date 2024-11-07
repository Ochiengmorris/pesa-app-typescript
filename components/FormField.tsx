import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type FormField = {
  title: string;
  type: "text" | "password";
  value: string;
  placeholder: string;
  handleChangeText: (value: string) => void;
  otherStyles?: string;
  fieldIcon?: keyof typeof Ionicons.glyphMap;
  errorMessage?: string;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "decimal-pad"
    | "twitter"
    | "web-search"
    | "visible-password";
};

const FormField = ({
  title,
  type,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  fieldIcon,
  errorMessage,
  secureTextEntry,
  keyboardType,
  ...props
}: FormField) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base mb-2 text-gray-700 font-pmedium">{title}</Text>
      <View className=" border-2 border-gray-200/30 w-full h-16 px-4 bg-primary rounded-2xl focus:border-secondary items-center flex-row">
        {fieldIcon && (
          <Ionicons
            name={fieldIcon}
            className="mr-2"
            size={18}
            color={"#752fce"}
          />
        )}

        {type === "password" ? (
          <>
            <TextInput
              className="flex-1 text-black font-psemibold text-base"
              value={value}
              placeholder={placeholder}
              placeholderTextColor={"#7b7b8b"}
              onChangeText={handleChangeText}
              secureTextEntry={!showPassword}
              {...props}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={!showPassword ? "eye" : "eye-off"} size={18} />
            </TouchableOpacity>
          </>
        ) : (
          <TextInput
            className="flex-1 text-black font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor={"#7b7b8b"}
            onChangeText={handleChangeText}
            {...props}
          />
        )}
      </View>
    </View>
  );
};
export default FormField;
