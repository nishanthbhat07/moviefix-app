import dayjs from "dayjs";
import { groupBy } from "lodash";
import { IMovieCardItem } from "../../components/movie-card/interface";

export const convertPagesDataToSectionListData = (data: IMovieCardItem[]) => {
  const groupedData = groupBy(data, (item: IMovieCardItem) =>
    dayjs(item.release_date).year(),
  );

  const sectionList = Object.keys(groupedData).map((key) => ({
    title: key,
    data: groupedData[key],
    key,
  }));

  return sectionList;
};

export const chunkArray = (array: IMovieCardItem[], size: number) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
};
