package com.laura.backendjava.service;

import com.laura.backendjava.client.tmdb.TmdbClient;
import com.laura.backendjava.client.tmdb.dto.TmdbGenresResponse;
import com.laura.backendjava.client.tmdb.dto.TmdbMoviesResponse;
import com.laura.backendjava.dto.Genre;
import com.laura.backendjava.dto.Movie;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class MoviesService {
    private static final String IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

    private final TmdbClient tmdbClient;
    private Map<Integer, String> genreMap;

    public MoviesService(TmdbClient tmdbClient) {
        this.tmdbClient = tmdbClient;
    }

    private void loadGenreMap() {
        if (genreMap == null) {
            TmdbGenresResponse genresResponse = tmdbClient.fetchGenres();
            genreMap = new HashMap<>();
            if (genresResponse.getGenres() != null) {
                for (var g : genresResponse.getGenres()) {
                    genreMap.put(g.getId(), g.getName());
                }
            }
        }
    }

    private Movie mapToMovie(com.laura.backendjava.client.tmdb.dto.TmdbMovie tmdbMovie) {
        Movie movie = new Movie();
        movie.setId(tmdbMovie.getId());
        movie.setTitle(tmdbMovie.getTitle());
        movie.setDescription(tmdbMovie.getOverview());

        if (tmdbMovie.getPosterPath() != null) {
            movie.setPosterUrl(IMAGE_BASE_URL + tmdbMovie.getPosterPath());
        }

        if (tmdbMovie.getReleaseDate() != null && tmdbMovie.getReleaseDate().length() >= 4) {
            movie.setReleaseYear(tmdbMovie.getReleaseDate().substring(0, 4));
        }

        if (tmdbMovie.getGenreIds() != null) {
            List<Genre> genres = new ArrayList<>();
            for (Integer genreId : tmdbMovie.getGenreIds()) {
                Genre genre = new Genre();
                genre.setId(genreId);
                genre.setName(genreMap.getOrDefault(genreId, "Unknown"));
                genres.add(genre);
            }
            movie.setGenres(genres);
        }

        movie.setLanguage(tmdbMovie.getOriginalLanguage());
        return movie;
    }

    public List<Movie> fetchMovies(Integer genreId) {
        loadGenreMap();
        TmdbMoviesResponse response = tmdbClient.discoverMovies(genreId);
        List<Movie> movies = new ArrayList<>();
        if (response.getResults() != null) {
            for (var tmdbMovie : response.getResults()) {
                movies.add(mapToMovie(tmdbMovie));
            }
        }
        return movies;
    }

    public List<Movie> searchMovies(String title) {
        loadGenreMap();
        TmdbMoviesResponse response = tmdbClient.searchMoviesByTitle(title);
        List<Movie> movies = new ArrayList<>();
        if (response.getResults() != null) {
            for (var tmdbMovie : response.getResults()) {
                movies.add(mapToMovie(tmdbMovie));
            }
        }
        return movies;
    }
}