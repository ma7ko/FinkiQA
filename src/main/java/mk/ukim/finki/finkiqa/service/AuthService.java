package mk.ukim.finki.finkiqa.service;

import mk.ukim.finki.finkiqa.model.User;

public interface AuthService {
    public User logIn(String username, String password);
}
