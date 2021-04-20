package mk.ukim.finki.finkiqa.model.dto;

import lombok.Data;

@Data
public class UserDto {
    private String username;
    private String password;
    private String name;
    private String surname;
    private String role;

    public UserDto(String username, String password, String name, String surname, String role) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.role = role;
    }
}
