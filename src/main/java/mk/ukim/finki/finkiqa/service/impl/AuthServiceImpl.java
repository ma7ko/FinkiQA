package mk.ukim.finki.finkiqa.service.impl;

import mk.ukim.finki.finkiqa.model.User;
import mk.ukim.finki.finkiqa.repository.UserRepository;
import mk.ukim.finki.finkiqa.service.AuthService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User logIn(String username, String password) {
        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            throw new IllegalArgumentException();
        }
        return userRepository.findByUsernameAndPassword(username, password).orElseThrow(IllegalArgumentException::new);
    }
}
