package pl.jlpt.jlptapi.dto.request.creator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestCreatorDto {

    private String name;
    private int number;
    private int timeLimit;
    private List<Long> exerciseIds;

}
