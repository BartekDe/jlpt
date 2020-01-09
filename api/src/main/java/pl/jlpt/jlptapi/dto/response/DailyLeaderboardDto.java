package pl.jlpt.jlptapi.dto.response;

import lombok.Builder;

@Builder
public class DailyLeaderboardDto {

    public String username;
    public int score;
    public int time;
}
