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
public class LessonCreatorDto {

    private String theory;
    private String name;
    private int number;
    private List<Long> exerciseIds;

}
