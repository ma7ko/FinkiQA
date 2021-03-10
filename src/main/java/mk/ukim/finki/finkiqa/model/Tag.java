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
    private Long id;

    private String name;

    private String description;

    public Tag() {
    }

    public Tag(String name) {
        this.name = name;
    }
}
