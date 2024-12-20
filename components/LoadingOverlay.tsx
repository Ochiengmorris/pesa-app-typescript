// LoadingOverlay.js
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { icons } from "../constants";

const LoadingOverlay = () => {
  return (
    <View style={styles.overlay}>
      <Image
        source={icons.loading}
        className="w-8 h-8 animate-spin  mx-auto"
        tintColor={"white"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(36, 1, 67, 0.3)",
  },
});

export default LoadingOverlay;
