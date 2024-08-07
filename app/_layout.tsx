import { StyleSheet } from "react-native";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import {
  useFonts,
  Inter_400Regular as regular400,
  Inter_500Medium as medium500,
  Inter_600SemiBold as semiBold600,
  Inter_700Bold as bold700,
} from "@expo-google-fonts/inter";
import colors from "../src/constants/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shark,
    flex: 1,
  },
});

const queryClient = new QueryClient();
const AppLayout = () => {
  useFonts({
    regular: regular400,
    medium: medium500,
    semiBold: semiBold600,
    bold: bold700,
  });
  return (
    <SafeAreaView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default AppLayout;
