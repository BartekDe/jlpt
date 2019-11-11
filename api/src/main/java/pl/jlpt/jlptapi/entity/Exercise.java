package pl.jlpt.jlptapi.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.jlpt.jlptapi.entity.Lesson;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Exercise {

    public static final String TRANSLATE_POL = "TranslatePol";
    public static final String TRANSLATE_HIRA = "TranslateHira";
    public static final String TRANSLATE_KATA = "TranslateKata";
    public static final String TRANSLATE_KANJI = "TranslateKanji";
    public static final String FILL_GAP = "FillGap";
    public static final String ORDER_WORDS = "OrderWords";
    public static final String FILL_GAP_TEXT = "FillGapText";
    public static final String READING_COMP_TEXT = "ReadingCompText";
    public static final String READING_COMP_TEXT_PICT = "ReadingCompTextPict";
    public static final String WRITE_IN_OTHER_WORDS = "WriteInOtherWords";
    public static final String DESCRIBE_PICT = "DescribePict";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;

    private int number;

    private String type;

    private String content;

    private String correctAnswer;

    private String answer1;
    private String answer2;
    private String answer3;
    private String answer4;
    private String answer5;

    private String contentImage;

    private String answerImage1;
    private String answerImage2;
    private String answerImage3;
    private String answerImage4;
    private String answerImage5;

    @ManyToMany(targetEntity = Lesson.class)
    private List<Lesson> lesson;
}
