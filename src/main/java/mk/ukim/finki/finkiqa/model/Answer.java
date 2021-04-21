package mk.ukim.finki.finkiqa.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
public class Answer {
    @Id
    @GeneratedValue
    private Long id;

    private String explanation;

    private Long likes;

    private Long dislikes;

    private LocalDateTime posted;

    private LocalDateTime lastEdited;

    @ManyToOne
    private Question question;

    @ManyToMany
    private List<User> likedByUsers;

    @ManyToMany
    private List<User> dislikedByUsers;

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
        this.posted = LocalDateTime.now();
    }
}
