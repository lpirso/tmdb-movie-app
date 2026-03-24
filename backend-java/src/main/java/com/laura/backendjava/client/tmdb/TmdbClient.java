package com.laura.backendjava.client.tmdb;

import com.laura.backendjava.client.tmdb.dto.TmdbGenresResponse;
import com.laura.backendjava.client.tmdb.dto.TmdbLanguage;
import com.laura.backendjava.client.tmdb.dto.TmdbMoviesResponse;
import com.laura.backendjava.config.TmdbProperties;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class TmdbClient {
    private static final Logger logger = LoggerFactory.getLogger(TmdbClient.class);

    private final RestTemplate restTemplate;
    private final TmdbProperties tmdbProperties;

    public TmdbClient(RestTemplate restTemplate, TmdbProperties tmdbProperties) {
        this.restTemplate = restTemplate;
        this.tmdbProperties = tmdbProperties;
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + tmdbProperties.getReadAccessToken());
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        return headers;
    }

    private <T> T fetchFromTmdb(String url, Map<String, String> params, Class<T> responseType) {
        HttpEntity<Void> entity = new HttpEntity<>(createHeaders());
        try {
            String fullUrl = url;
            if (params != null && !params.isEmpty()) {
                StringBuilder sb = new StringBuilder(url);
                sb.append("?");
                for (Map.Entry<String, String> entry : params.entrySet()) {
                    if (entry.getValue() != null && !entry.getValue().isEmpty()) {
                        sb.append(entry.getKey()).append("=").append(entry.getValue()).append("&");
                    }
                }
                fullUrl = sb.toString();
                if (fullUrl.endsWith("&")) {
                    fullUrl = fullUrl.substring(0, fullUrl.length() - 1);
                }
            }
            return restTemplate.exchange(fullUrl, HttpMethod.GET, entity, responseType).getBody();
        } catch (Exception e) {
            logger.error("Failed to fetch from TMDB: " + e.getMessage());
            throw new RuntimeException("External API error");
        }
    }

    public TmdbMoviesResponse searchMoviesByTitle(String query) {
        String url = tmdbProperties.getBaseUrl() + "/search/movie";
        Map<String, String> params = new HashMap<>();
        params.put("query", query);
        params.put("include_adult", "false");
        params.put("language", "en-US");
        params.put("page", "1");
        return fetchFromTmdb(url, params, TmdbMoviesResponse.class);
    }

    public TmdbMoviesResponse discoverMovies(Integer genreId) {
        String url = tmdbProperties.getBaseUrl() + "/discover/movie";
        Map<String, String> params = new HashMap<>();
        if (genreId != null) {
            params.put("with_genres", genreId.toString());
        }
        params.put("include_adult", "false");
        params.put("language", "en-US");
        params.put("page", "1");
        params.put("sort_by", "vote_count.desc");
        return fetchFromTmdb(url, params, TmdbMoviesResponse.class);
    }

    public TmdbGenresResponse fetchGenres() {
        String url = tmdbProperties.getBaseUrl() + "/genre/movie/list";
        Map<String, String> params = new HashMap<>();
        params.put("language", "en-US");
        TmdbGenresResponse response = fetchFromTmdb(url, params, TmdbGenresResponse.class);
        System.out.println(response);
        return response;
    }

    public TmdbLanguage[] fetchLanguages(String url) {
        return fetchFromTmdb(url, new HashMap<>(), TmdbLanguage[].class);
    }

    public List<TmdbLanguage> fetchLanguages() {
        String url = tmdbProperties.getBaseUrl() + "/configuration/languages";
        return List.of(fetchLanguages(url));
    }
}
