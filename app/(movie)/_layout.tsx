import { View, Text } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import colors from "../../src/constants/colors";

const MovieLayout = () => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
      }}
    >
      <Text>MovieLayout</Text>
      <Slot />
    </View>
  );
};

export default MovieLayout;
