import { FlatList } from "react-native";
import React from "react";
import MovieCard from "../../components/movie-card";
import styles from "./styles";
import ScrollableChips from "../../components/scrollable-chips";
import { useGenreList, useMovieListing } from "./hooks";

function MovieListing() {
  const { genres, handleGenrePress, selectedGenre } = useGenreList();
  const { handleScroll, moviesList } = useMovieListing({
    genre: selectedGenre.toString(),
  });
  return (
    <>
      <ScrollableChips
        scrollChipsData={genres}
        onPress={handleGenrePress}
        selectedChip={selectedGenre}
      />
      <FlatList
        bounces={false}
        style={styles.flatlistContainer}
        keyExtractor={(item) => item.id.toString()}
        onScroll={handleScroll}
        contentContainerStyle={styles.flatlist}
        numColumns={2}
        data={moviesList}
        renderItem={({ item }) => <MovieCard item={item} />}
      />
    </>
  );
}

export default MovieListing;
