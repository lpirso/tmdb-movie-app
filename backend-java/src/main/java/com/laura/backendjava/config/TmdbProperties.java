package com.laura.backendjava.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "tmdb")
public class TmdbProperties {
    private String readAccessToken;
    private String baseUrl;
    private String frontendUrl;

    public String getReadAccessToken() { return readAccessToken; }
    public void setReadAccessToken(String readAccessToken) { this.readAccessToken = readAccessToken; }
    public String getBaseUrl() { return baseUrl; }
    public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }
    public String getFrontendUrl() { return frontendUrl; }
    public void setFrontendUrl(String frontendUrl) { this.frontendUrl = frontendUrl; }
}