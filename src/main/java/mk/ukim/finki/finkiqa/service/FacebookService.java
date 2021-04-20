package mk.ukim.finki.finkiqa.service;

import mk.ukim.finki.finkiqa.payload.response.JwtResponse;

public interface FacebookService {
    JwtResponse loginUser(String fbAccessToken);
}
