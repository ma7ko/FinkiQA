package mk.ukim.finki.finkiqa.service.impl;

import lombok.extern.slf4j.Slf4j;
import mk.ukim.finki.finkiqa.client.FacebookClient;
import mk.ukim.finki.finkiqa.model.Role;
import mk.ukim.finki.finkiqa.model.User;
import mk.ukim.finki.finkiqa.model.enumeration.ERole;
import mk.ukim.finki.finkiqa.model.facebook.FacebookUser;
import mk.ukim.finki.finkiqa.payload.response.JwtResponse;
import mk.ukim.finki.finkiqa.security.jwt.JwtUtils;
import mk.ukim.finki.finkiqa.security.services.UserDetailsImpl;
import mk.ukim.finki.finkiqa.service.FacebookService;
import mk.ukim.finki.finkiqa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ExpressionException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@Slf4j
public class FacebookServiceImpl implements FacebookService {

    @Autowired private FacebookClient facebookClient;
    @Autowired private UserService userService;
    @Autowired private JwtUtils tokenProvider;

    public JwtResponse loginUser(String fbAccessToken) {
        var facebookUser = facebookClient.getUser(fbAccessToken);

        String userUsername = generateUsername(facebookUser.getFirstName(), facebookUser.getLastName());
        String password =  generatePassword(8);

        String token = userService.findByUsername(userUsername)
                .or(() -> Optional.ofNullable(userService.register(userUsername, password, password, facebookUser.getFirstName(), facebookUser.getLastName(), ERole.ROLE_USER)))
                .map(UserDetailsImpl::new)
                .map(userDetails -> new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()))
                .map(tokenProvider::generateJwtToken)
                .orElseThrow(() ->  new ExpressionException("unable to login facebook user id " + facebookUser.getId()));

        List<String> roles = new ArrayList<>();
        roles.add("ROLE_USER");

        return new JwtResponse(token,
                facebookUser.getId(),
                userUsername,
                facebookUser.getEmail(),
                roles);
    }

    private String generateUsername(String firstName, String lastName) {
        return String.format("%s.%s", firstName, lastName);
    }

    private String generatePassword(int length) {
        String capitalCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        String specialCharacters = "!@#$";
        String numbers = "1234567890";
        String combinedChars = capitalCaseLetters + lowerCaseLetters + specialCharacters + numbers;
        Random random = new Random();
        char[] password = new char[length];

        password[0] = lowerCaseLetters.charAt(random.nextInt(lowerCaseLetters.length()));
        password[1] = capitalCaseLetters.charAt(random.nextInt(capitalCaseLetters.length()));
        password[2] = specialCharacters.charAt(random.nextInt(specialCharacters.length()));
        password[3] = numbers.charAt(random.nextInt(numbers.length()));

        for(int i = 4; i< length ; i++) {
            password[i] = combinedChars.charAt(random.nextInt(combinedChars.length()));
        }
        return new String(password);
    }
}
