import { useInfiniteQuery, useQuery } from "react-query";
import { useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { fetchGenreList, fetchMoviesList } from "./api";

export const useGenreList = () => {
  const {
    data: { data: { genres = [] } = {} } = {},
    isLoading: isGenreLoading,
  } = useQuery(["genreList"], fetchGenreList);

  const [selectedGenre, setSelectedGenre] = useState(0);

  const handleGenrePress = (id: number) => {
    setSelectedGenre(id);
  };

  return {
    genres,
    isGenreLoading,
    handleGenrePress,
    selectedGenre,
  };
};

export const useMovieListing = ({ genre }: { genre?: string } = {}) => {
  const [year, setYear] = useState(dayjs().year(2012).year());
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("up");
  const scrollOffsetY = useRef(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const direction = currentOffsetY > scrollOffsetY.current ? "down" : "up";
    setScrollDirection(direction);
    scrollOffsetY.current = currentOffsetY;
  };

  const { data: { pages = [] } = {} } = useInfiniteQuery(
    ["movieList", year, genre],
    ({ pageParam }) =>
      fetchMoviesList({
        page: pageParam,
        year: year.toString(),
        genre: genre === "All" || !genre ? undefined : genre,
      }),
  );

  const moviesList = useMemo(() => {
    return pages?.length ? pages.flatMap((item) => item?.data?.results) : [];
  }, [pages]);

  return {
    handleScroll,
    moviesList: moviesList.slice(0, 20),
    scrollDirection,
    setYear,
  };
};
