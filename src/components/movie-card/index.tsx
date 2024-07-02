import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import styles from "./styles";
import { IMovieCard } from "./interface";

const MovieCard: React.FC<IMovieCard> = ({ item }) => {
  return (
    <Image
      contentFit="cover"
      style={styles.posterImg}
      source={{
        uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
      }}
      blurRadius={5}
    >
      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.title}>{Number(item.vote_average).toFixed(2)}</Text>
      </View>
    </Image>
  );
};

export default MovieCard;
