export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbSearchResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

export interface TmdbGenresResponse {
  genres: TmdbGenre[];
}
