import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const TransLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" backgroundColor="#d9d9d9" />
    </>
  );
};

export default TransLayout;
