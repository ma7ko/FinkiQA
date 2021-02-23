package mk.ukim.finki.finkiqa.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Answer {
    @Id
    @GeneratedValue
    private Long Id;
    private String explanation;
    private Long likes;
    private Long dislikes;

    @OneToOne
    private User user;

    public Answer() {
    }

    public Answer(String explanation, Long likes, Long dislikes) {
        this.explanation = explanation;
        this.likes = likes;
        this.dislikes = dislikes;
    }
}
