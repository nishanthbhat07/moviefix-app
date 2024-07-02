import { View } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import colors from "../../src/constants/colors";
import MovieListingHeader from "../../src/components/movie-listing-header";

const MovieLayout = () => {
  return (
    <View
      style={{
        backgroundColor: colors.codGray,
      }}
    >
      <MovieListingHeader />
      <Slot />
    </View>
  );
};

export default MovieLayout;
