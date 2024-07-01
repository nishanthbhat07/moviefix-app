import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import { IMovieCard } from "./interface";

const MovieCard: React.FC<IMovieCard> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text>{item}</Text>
    </View>
  );
};

export default MovieCard;
