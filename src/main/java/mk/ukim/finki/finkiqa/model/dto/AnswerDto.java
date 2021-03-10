package mk.ukim.finki.finkiqa.model.dto;

import lombok.Data;

@Data
public class AnswerDto {
    private String explanation;
    private Long likes;
    private Long dislikes;
    private Long questionId;
    private String userId;

    public AnswerDto(String explanation, Long likes, Long dislikes, Long questionId, String userId) {
        this.explanation = explanation;
        this.likes = likes;
        this.dislikes = dislikes;
        this.questionId = questionId;
        this.userId = userId;
    }
}
