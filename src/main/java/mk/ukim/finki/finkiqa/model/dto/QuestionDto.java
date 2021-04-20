package mk.ukim.finki.finkiqa.model.dto;

import lombok.Data;

import java.util.List;


@Data
public class QuestionDto {
    private String title;
    private String description;
    private Long likes;
    private Long dislikes;
    private String userId;
    private List<String> tags;

    public QuestionDto(String title,
                       String description,
                       Long likes,
                       Long dislikes,
                       String userId,
                       List<String> tags) {
        this.title = title;
        this.description = description;
        this.likes = likes;
        this.dislikes = dislikes;
        this.userId = userId;
        this.tags = tags;
    }
}
