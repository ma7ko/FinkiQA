package mk.ukim.finki.finkiqa.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
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

    @ManyToOne
    private User user;

    @ManyToMany
    private List<Tag> tags;

    @ManyToMany
    private List<User> likedByUsers;

    @ManyToMany
    private List<User> dislikedByUsers;

    public Question() {
    }

    public Question(String title, String description, Long likes, Long dislikes, User user, List<Tag> tags) {
        this.title = title;
        this.description = description;
        this.likes = likes;
        this.dislikes = dislikes;
        this.user = user;
        this.tags = tags;
        this.likedByUsers = new ArrayList<>();
    }
}
