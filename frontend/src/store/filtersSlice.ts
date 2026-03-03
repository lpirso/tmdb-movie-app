import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FiltersState = {
  genreId: number | null;
  searchText: string;
};

const initialState: FiltersState = {
  genreId: null,
  searchText: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setGenreIdAndClearSearch(state, action: PayloadAction<number | null>) {
      state.genreId = action.payload;
      state.searchText = "";
    },
    setSearchTextAndClearGenre(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
      state.genreId = null;
    },
    clearSearch(state) {
      state.searchText = "";
    },
    resetFilters(state) {
      state.genreId = null;
      state.searchText = "";
    },
  },
});

export const {
  setGenreIdAndClearSearch,
  setSearchTextAndClearGenre,
  clearSearch,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
