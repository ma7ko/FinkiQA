package mk.ukim.finki.finkiqa.model;

import lombok.Data;
import mk.ukim.finki.finkiqa.model.enumeration.Role;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Data
@Entity
@Table(name = "qa_user")
public class User {
    @Id
    private String username;
    private String password;
    private String name;
    private String surname;
    private Role role;

    @OneToMany
    private List<Question> questions;

    public User() {
    }

    public User(String username, String password, String name, String surname, Role role) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.role = role;
    }
}
