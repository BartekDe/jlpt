package pl.jlpt.jlptapi.dto.response;

import lombok.Builder;

@Builder
public class LessonLeaderboardDto {

    public String username;
    public int score;
}
