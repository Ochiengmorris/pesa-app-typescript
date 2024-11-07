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
const SignUp = () => {
  const { register, isLoading } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    username: "",
    password: "",
    email: "",
  });

  const Submit = async () => {
    if (!form.email || !form.password || !form.username || !form.phone) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await register({
        phone: form.phone,
        password: form.password,
        email: form.email,
        username: form.username,
      });

      if (result.status === "SUCCESS") {
        // Alert.alert(`${result.status}`, result.message);
        router.replace("/verify-email");
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while submitting the form.");
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
                Sign Up
              </Text>
            </View>

            <View className="mb-6">
              <FormField
                type="text"
                title={"Username"}
                value={form.username}
                otherStyles={"mx-4"}
                handleChangeText={(ev) => setForm({ ...form, username: ev })}
                placeholder={"Enter username"}
                fieldIcon={"person-outline"}
              />
              <FormField
                title="Email"
                type="text"
                value={form.email}
                placeholder={"Enter Email Address"}
                handleChangeText={(ev) => setForm({ ...form, email: ev })}
                otherStyles="mt-7 mx-4"
                fieldIcon={"mail-outline"}
              />

              <FormField
                title={"Phone number"}
                type="text"
                value={form.phone}
                handleChangeText={(ev) => setForm({ ...form, phone: ev })}
                placeholder={"0712345678"}
                otherStyles={"mx-4 mt-7"}
                fieldIcon={"call-outline"}
                keyboardType="numeric"
              />

              <FormField
                title="Password"
                type={"password"}
                value={form.password}
                placeholder={"Password"}
                handleChangeText={(ev) => setForm({ ...form, password: ev })}
                otherStyles="mt-7 mx-4"
                fieldIcon={"lock-closed-outline"}
              />

              <View className="mx-4 flex flex-row gap-4 mt-10 min-h-[62px]">
                <CustomButton
                  title="Sign Up"
                  handlePress={Submit}
                  containerStyles="grow"
                  isLoading={isSubmitting}
                />
              </View>
            </View>

            <Text className="font-pmedium text-center">
              Already have an account{" "}
              <Link href="/sign-in" className="text-secondary underline">
                Sign in
              </Link>
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {isLoading && <LoadingOverlay />}
    </>
  );
};
export default SignUp;
