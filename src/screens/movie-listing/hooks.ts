import { useInfiniteQuery, useQuery } from "react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SectionList,
} from "react-native";
import { fetchGenreList, fetchMoviesList } from "./api";
import { convertPagesDataToSectionListData } from "./utils";

export const useGenreList = () => {
  const {
    data: { data: { genres = [] } = {} } = {},
    isLoading: isGenreLoading,
  } = useQuery(["genreList"], fetchGenreList);

  const [selectedGenre, setSelectedGenre] = useState([0]);

  const handleGenrePress = (id: number) => {
    setSelectedGenre((prev) => {
      if (prev.includes(0) || !+id) {
        return [id];
      }
      return [...prev, id];
    });
  };

  return {
    genres,
    isGenreLoading,
    handleGenrePress,
    selectedGenre,
  };
};

export const useMovieListing = ({ genre }: { genre?: number[] } = {}) => {
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("up");
  const scrollOffsetY = useRef(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const prevOffset = useRef(0);
  const listRef = useRef<SectionList>(null);
  const {
    data: { pages = [] } = {},
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
  } = useInfiniteQuery(
    ["movieList", genre],
    ({ pageParam = "2012" }) =>
      fetchMoviesList({
        page: 1,
        year: pageParam,
        genre: !Number(genre?.[0]) ? undefined : genre?.join(","),
      }),
    {
      getPreviousPageParam: (firstPage) => {
        return firstPage.previousYear;
      },
      getNextPageParam: (lastPage) => {
        return lastPage.nextYear < dayjs().year()
          ? lastPage.nextYear
          : undefined;
      },
      retry: 3,
    },
  );

  const moviesList = useMemo(() => {
    const data = pages?.length
      ? pages.flatMap((item) => item?.data?.results?.slice(0, 20))
      : [];
    return convertPagesDataToSectionListData(data);
  }, [pages]);

  const handleScrollOnEnd = () => {
    if (hasNextPage && scrollDirection === "down") {
      fetchNextPage();
    }
    if (hasPreviousPage && scrollDirection === "up") {
      fetchPreviousPage();
    }
  };

  const handleScrollToOffset = () => {
    if (listRef.current && prevOffset.current) {
      listRef.current.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        viewOffset: scrollOffset,
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (!isFetchingPreviousPage) {
      handleScrollToOffset();
    }
  }, [isFetchingPreviousPage]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const direction = currentOffsetY > scrollOffsetY.current ? "down" : "up";
    setScrollDirection(direction);
    scrollOffsetY.current = currentOffsetY;
    if (event.nativeEvent.contentOffset.y <= 0 && hasPreviousPage) {
      if (event.nativeEvent.contentOffset.y <= 0) {
        setScrollOffset(event.nativeEvent.contentOffset.y);
      }
      prevOffset.current =
        event.nativeEvent.contentSize.height -
        event.nativeEvent.layoutMeasurement.height;
      handleScrollOnEnd();
    }
  };

  return {
    handleScroll,
    moviesList,
    scrollDirection,
    handleScrollOnEnd,
    isFetchingNextPage,
    hasPreviousPage,
    listRef,
    isFetchingPreviousPage,
    scrollOffset,
    isLoading,
  };
};
