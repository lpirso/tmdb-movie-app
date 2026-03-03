import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setGenreIdAndClearSearch } from "../../store/filtersSlice";
import { useGetGenresQuery } from "../../store/tmdbApi";
import { Select, Option } from "../shared.styles";

export const GenreSelect = () => {
  const { data } = useGetGenresQuery();
  const dispatch = useAppDispatch();
  const { genreId } = useAppSelector((state) => state.filters);

  const genres = data?.genres || [];

  return (
    <Select
      value={genreId ?? ""}
      onChange={(e) =>
        dispatch(setGenreIdAndClearSearch(e.target.value ? Number(e.target.value) : null))
      }
    >
      <Option value="">All genres</Option>
      {genres.map((genre) => {
        return (
          <Option key={genre.id} value={genre.id}>
            {genre.name}
          </Option>
        );
      })}
    </Select>
  );
};
