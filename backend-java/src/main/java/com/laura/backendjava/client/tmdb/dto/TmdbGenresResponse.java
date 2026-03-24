package com.laura.backendjava.client.tmdb.dto;

import java.util.List;

public class TmdbGenresResponse {
    private List<TmdbGenre> genres;

    public List<TmdbGenre> getGenres() { return genres; }
    public void setGenres(List<TmdbGenre> genres) { this.genres = genres; }
}
