import apis from "../../apis";
import apiclient from "../../apis/apiclient";
import { IMoviesListingAPIArgs } from "./interface";

export const fetchMoviesList = async ({
  year,
  page,
  genre,
}: IMoviesListingAPIArgs) =>
  apiclient.get(apis.getMovies, {
    params: {
      api_key: process.env.EXPO_PUBLIC_API_SECRET_KEY,
      sort_by: "popularity.desc",
      primary_release_year: year,
      page,
      "vote_count.gte": "100",
      with_genres: genre,
      // "primary_release_date.gte": "2012",
      // "primary_release_date.lte": year,
    },
  });
export const fetchGenreList = async () =>
  apiclient.get(apis.genreList, {
    params: {
      api_key: process.env.EXPO_PUBLIC_API_SECRET_KEY,
      language: "en",
    },
  });
