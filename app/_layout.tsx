import { StyleSheet } from "react-native";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import colors from "../src/constants/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparent,
    flex: 1,
  },
});

const queryClient = new QueryClient();
const AppLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default AppLayout;
