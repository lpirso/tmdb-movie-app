export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
  backdrop_path: string;
  original_language: string;
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbMoviesResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

export interface TmdbGenresResponse {
  genres: TmdbGenre[];
}

export interface TmdbLanguage {
  iso_639_1: string;
  english_name: string;
  name: string;
}
