import apis from "../../apis";
import apiclient from "../../apis/apiclient";
import { IMoviesListingAPIArgs } from "./interface";

export const fetchMoviesList = ({ year, page, genre }: IMoviesListingAPIArgs) =>
  apiclient.get(apis.getMovies, {
    params: {
      api_key: process.env.API_SECRET_KEY,
      sort_by: "popularity.desc",
      primary_release_year: year,
      page,
      "vote_count.gte": "100",
      with_genres: genre,
    },
  });
