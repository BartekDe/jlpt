package pl.jlpt.jlptapi.dto.response;

import lombok.Builder;

@Builder
public class TestLeaderboardDto {

    public String username;
    public int score;
}
