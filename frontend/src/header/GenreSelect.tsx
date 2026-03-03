import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setGenreIdAndClearSearch } from "../store/filtersSlice";
import { useGetGenresQuery } from "../store/tmdbApi";

export const GenreSelect = () => {
    const { data, isLoading, error } = useGetGenresQuery();
    const dispatch = useAppDispatch();
    const { genreId } = useAppSelector((state) => state.filters);

    const genres = data?.genres || [];

    return (
        <select
            value={genreId ?? ""}
            onChange={(e) =>
                dispatch(
                    setGenreIdAndClearSearch(e.target.value ? Number(e.target.value) : null),
                )
            }
        >
            <option value="">All genres</option>
            {genres.map((genre) => {
                return <option key={genre.id} value={genre.id}>{genre.name}</option>;
            })}
        </select>
    );
};
