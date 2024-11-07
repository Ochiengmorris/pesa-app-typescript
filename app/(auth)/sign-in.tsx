import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useAuthStore } from "@/context/store/AuthStore";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
const SignIn = () => {
  const { login, isLoading } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const Submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await login({
        email: form.email,
        password: form.password,
      });
      if (result.status === "SUCCESS") {
        router.push("/home");
      } else {
        Alert.alert("Error", result.message.message);
      }
    } catch (error) {
      const axiosError = error as any;
      Alert.alert("Error", axiosError.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView className="mt-24 h-full">
            <View className="mb-12 mx-4">
              <Text className="text-4xl text-center font-psemibold">
                Sign In
              </Text>
            </View>

            <View className="mb-6">
              <FormField
                title="Email"
                type="text"
                value={form.email}
                placeholder="Enter your email"
                handleChangeText={(value) => setForm({ ...form, email: value })}
                otherStyles={"mx-4"}
                fieldIcon={"mail-outline"}
              />

              <FormField
                title="Password"
                type="password"
                value={form.password}
                placeholder="Enter your password"
                handleChangeText={(value) =>
                  setForm({ ...form, password: value })
                }
                otherStyles={"mt-7 mx-4"}
                fieldIcon={"lock-closed-outline"}
              />

              <Link href={"/"} className="mx-4 mt-1 self-end" asChild>
                <Text className="font-pregular underline">
                  Forgot Password?
                </Text>
              </Link>

              <View className="mx-4 flex flex-row gap-4 mt-10 min-h-[62px]">
                <CustomButton
                  title="Sign In"
                  handlePress={Submit}
                  containerStyles="grow"
                  isLoading={isSubmitting}
                />
              </View>
            </View>

            <Text className="font-pmedium text-center">
              I don't have an account{" "}
              <Link href="/sign-up" className="text-secondary underline">
                Sign up
              </Link>
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {isLoading && <LoadingOverlay />}
    </>
  );
};
export default SignIn;
