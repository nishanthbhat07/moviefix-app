import { View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import styles from "./styles";
import images from "./images";

const MovieListingHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={images.logo} contentFit="contain" style={styles.logo} />
    </View>
  );
};

export default MovieListingHeader;
