package com.laura.backendjava.service;

import com.laura.backendjava.client.tmdb.TmdbClient;
import com.laura.backendjava.client.tmdb.dto.TmdbGenresResponse;
import org.springframework.stereotype.Service;

@Service
public class GenresService {
    private final TmdbClient tmdbClient;

    public GenresService(TmdbClient tmdbClient) {
        this.tmdbClient = tmdbClient;
    }

    public TmdbGenresResponse fetchGenres() {
        return tmdbClient.fetchGenres();
    }
}