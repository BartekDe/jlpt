package pl.jlpt.jlptapi.dto.response;

import lombok.Builder;

@Builder
public class DailyLeaderboardDto implements Comparable<DailyLeaderboardDto> {

    public String username;
    public int score;
    public int time;

    @Override
    public int compareTo(DailyLeaderboardDto dailyLeaderboardDto) {
        int result = dailyLeaderboardDto.score - this.score;
        if (result==0) {
            return this.time - dailyLeaderboardDto.time;
        } else {
            return result;
        }
    }
}
