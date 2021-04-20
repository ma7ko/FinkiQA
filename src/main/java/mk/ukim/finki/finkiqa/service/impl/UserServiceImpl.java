package mk.ukim.finki.finkiqa.service.impl;

import mk.ukim.finki.finkiqa.model.Role;
import mk.ukim.finki.finkiqa.model.User;
import mk.ukim.finki.finkiqa.model.enumeration.ERole;
import mk.ukim.finki.finkiqa.repository.RoleRepository;
import mk.ukim.finki.finkiqa.repository.UserRepository;
import mk.ukim.finki.finkiqa.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @Override
    public User register(String username, String password, String repeatPassword, String name, String surname, ERole ERole) {
        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            throw new IllegalArgumentException();
        }
        if (!password.equals(repeatPassword)) {
            throw new IllegalArgumentException();
        }

        if (this.userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException();
        }

        Role givenRole = this.roleRepository.findByName(ERole).orElseThrow(IllegalArgumentException::new);
        User user = new User(username, passwordEncoder.encode(password), name, surname, givenRole);
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return this.userRepository.findById(id);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByUsername(s).orElseThrow(() -> new UsernameNotFoundException(s));
    }
}
