package com.laura.backendjava.client.tmdb.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TmdbLanguage {
    @JsonProperty("iso_639_1")
    private String iso6391;

    @JsonProperty("english_name")
    private String englishName;

    private String name;

    public String getIso6391() { return iso6391; }
    public void setIso6391(String iso6391) { this.iso6391 = iso6391; }
    public String getEnglishName() { return englishName; }
    public void setEnglishName(String englishName) { this.englishName = englishName; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
