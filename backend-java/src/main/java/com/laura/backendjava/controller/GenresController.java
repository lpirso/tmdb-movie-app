package com.laura.backendjava.controller;

import com.laura.backendjava.service.GenresService;
import com.laura.backendjava.client.tmdb.dto.TmdbGenresResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/genres")
public class GenresController {
    private final GenresService genresService;

    public GenresController(GenresService genresService) {
        this.genresService = genresService;
    }

    @GetMapping
    public TmdbGenresResponse fetchGenres() {
        return genresService.fetchGenres();
    }
}