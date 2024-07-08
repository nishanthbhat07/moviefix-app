import {
  ActivityIndicator,
  FlatList,
  SectionList,
  Text,
  View,
} from "react-native";
import React, { useCallback } from "react";
import MovieCard from "../../components/movie-card";
import styles from "./styles";
import ScrollableChips from "../../components/scrollable-chips";
import { useGenreList, useMovieListing } from "./hooks";
import { chunkArray } from "./utils";
import { IMovieCardItem } from "../../components/movie-card/interface";
import colors from "../../constants/colors";

const NUM_COLUMNS = 2;

function MovieListing() {
  const { genres, handleGenrePress, selectedGenre } = useGenreList();
  const {
    handleScroll,
    moviesList,
    handleScrollOnEnd,
    isFetchingNextPage,
    listRef,
    isFetchingPreviousPage,
    isLoading,
  } = useMovieListing({
    genre: selectedGenre,
  });

  const renderItem = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ item }: { item: IMovieCardItem[] }) => (
      <FlatList
        numColumns={2}
        keyExtractor={(movie) => movie.id.toString()}
        data={item}
        renderItem={({ item: movie }) => <MovieCard item={movie} />}
      />
    ),
    [],
  );

  return (
    <>
      <ScrollableChips
        scrollChipsData={genres}
        onPress={handleGenrePress}
        selectedChip={selectedGenre}
      />
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.white} />
        </View>
      ) : (
        <SectionList
          // inverted={scrollDirection === "down"}
          sections={moviesList.map(
            (section: { title: string; data: IMovieCardItem[] }) => ({
              ...section,
              data: chunkArray(section.data, NUM_COLUMNS) as IMovieCardItem[][],
            }),
          )}
          ListEmptyComponent={
            <View>
              <Text style={styles.sectionHeader}>No Results Found!</Text>
            </View>
          }
          ref={listRef}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          bounces={false}
          onEndReached={handleScrollOnEnd}
          style={styles.flatlistContainer}
          onScroll={handleScroll}
          contentContainerStyle={styles.flatlist}
          onEndReachedThreshold={0.5}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => {
              setTimeout(resolve, 100);
            });
            wait.then(() => {
              listRef.current?.scrollToLocation({
                sectionIndex: info.index,
                itemIndex: 0,
                viewPosition: 0.5,
              });
            });
          }}
          data={moviesList}
          renderItem={renderItem}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : null
          }
          ListHeaderComponent={
            isFetchingPreviousPage && moviesList.length ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : null
          }
        />
      )}
    </>
  );
}

export default MovieListing;
