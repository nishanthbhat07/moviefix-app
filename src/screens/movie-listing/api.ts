import dayjs from "dayjs";
import apis from "../../apis";
import apiclient from "../../apis/apiclient";
import { IMoviesListingAPIArgs } from "./interface";

export const fetchMoviesList = async ({
  year,
  page,
  genre,
}: IMoviesListingAPIArgs) => {
  let response;
  try {
    response = await apiclient.get(apis.getMovies, {
      params: {
        api_key: process.env.EXPO_PUBLIC_API_SECRET_KEY,
        sort_by: "popularity.desc",
        primary_release_year: year,
        page,
        "vote_count.gte": "100",
        with_genres: genre,
      },
    });
  } catch (e) {
    console.error("error while fetching movies list; for year", year, e);
  }
  return {
    data: response?.data,
    nextYear: dayjs().year(+year).add(1, "year").year(),
    previousYear: dayjs().year(+year).subtract(1, "year").year(),
    year,
  };
};

export const fetchGenreList = async () =>
  apiclient.get(apis.genreList, {
    params: {
      api_key: process.env.EXPO_PUBLIC_API_SECRET_KEY,
      language: "en",
    },
  });
