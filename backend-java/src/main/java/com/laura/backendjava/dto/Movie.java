package com.laura.backendjava.dto;

import java.util.List;

public class Movie {
    private int id;
    private String title;
    private String description;
    private String posterUrl;
    private String releaseYear;
    private List<Genre> genres;
    private String language;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPosterUrl() { return posterUrl; }
    public void setPosterUrl(String posterUrl) { this.posterUrl = posterUrl; }
    public String getReleaseYear() { return releaseYear; }
    public void setReleaseYear(String releaseYear) { this.releaseYear = releaseYear; }
    public List<Genre> getGenres() { return genres; }
    public void setGenres(List<Genre> genres) { this.genres = genres; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
}