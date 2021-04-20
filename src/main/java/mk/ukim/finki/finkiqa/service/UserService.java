package mk.ukim.finki.finkiqa.service;

import mk.ukim.finki.finkiqa.model.User;
import mk.ukim.finki.finkiqa.model.enumeration.ERole;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    public User register(String username, String password, String repeatPassword, String name, String surname, ERole ERole);
    public Optional<User> findById(Long id);
    public Optional<User> findByUsername(String username);
}
