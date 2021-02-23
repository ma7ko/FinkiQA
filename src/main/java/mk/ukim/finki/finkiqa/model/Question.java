package mk.ukim.finki.finkiqa.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Question {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private Long likes;
    private Long dislikes;

    @OneToMany
    private List<Answer> answers;

    @ManyToMany
    private List<Tag> tags;

    public Question() {
    }

    public Question(String title, String description, Long likes, Long dislikes) {
        this.title = title;
        this.description = description;
        this.likes = likes;
        this.dislikes = dislikes;
    }
}
