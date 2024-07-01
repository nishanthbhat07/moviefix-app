import { FlatList, View } from "react-native";
import React from "react";
import MovieCard from "../../components/movie-card";
import styles from "./styles";

function MovieListing() {
  const data = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.flatlist}
        numColumns={2}
        data={data}
        renderItem={({ item }) => <MovieCard item={item} />}
      />
    </View>
  );
}

export default MovieListing;
