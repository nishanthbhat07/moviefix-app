import { View, Text, StyleSheet } from "react-native";
import React, { memo } from "react";
import { ImageBackground } from "expo-image";
import styles from "./styles";
import { IMovieCard } from "./interface";

const MovieCard: React.FC<IMovieCard> = ({ item }) => {
  return (
    <ImageBackground
      contentFit="contain"
      style={styles.posterImg}
      source={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
      // blurRadius={5}
      transition={800}
    >
      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.title}>{Number(item.vote_average).toFixed(2)}</Text>
      </View>
    </ImageBackground>
  );
};

export default memo(MovieCard);
