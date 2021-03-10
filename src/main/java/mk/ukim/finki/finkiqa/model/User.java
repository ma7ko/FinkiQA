package mk.ukim.finki.finkiqa.model;

import lombok.Data;
import mk.ukim.finki.finkiqa.model.enumeration.Role;

import javax.persistence.*;
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

    @Enumerated(value = EnumType.STRING)
    private Role role;

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
