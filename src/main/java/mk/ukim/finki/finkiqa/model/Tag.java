package mk.ukim.finki.finkiqa.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Tag {
    @Id
    @GeneratedValue
    private Long Id;
    private String name;
    private String description;

    public Tag() {
    }

    public Tag(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
