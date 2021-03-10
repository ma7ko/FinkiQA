package mk.ukim.finki.finkiqa.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Answer {
    @Id
    @GeneratedValue
    private Long id;

    private String explanation;

    private Long likes;

    private Long dislikes;

    @ManyToOne
    private Question question;

    @OneToOne
    private User user;

    public Answer() {
    }

    public Answer(String explanation, Long likes, Long dislikes, Question question, User user) {
        this.explanation = explanation;
        this.likes = likes;
        this.dislikes = dislikes;
        this.question = question;
        this.user = user;
    }
}
