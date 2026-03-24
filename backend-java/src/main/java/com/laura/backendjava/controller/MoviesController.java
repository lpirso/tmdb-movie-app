package com.laura.backendjava.controller;

import com.laura.backendjava.dto.Movie;
import com.laura.backendjava.service.MoviesService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movies")
public class MoviesController {
    private final MoviesService moviesService;

    public MoviesController(MoviesService moviesService) {
        this.moviesService = moviesService;
    }

    @GetMapping
    public List<Movie> fetchMovies(@RequestParam(required = false) Integer genreId) {
        return moviesService.fetchMovies(genreId);
    }

    @GetMapping("/search")
    public List<Movie> searchMovies(@RequestParam String title) {
        return moviesService.searchMovies(title);
    }
}