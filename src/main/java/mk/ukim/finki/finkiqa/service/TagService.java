package mk.ukim.finki.finkiqa.service;

import mk.ukim.finki.finkiqa.model.Tag;

import java.util.List;
import java.util.Optional;

public interface TagService {
    List<Tag> listAll();
    Optional<Tag> getTagById(Long Id);
    Optional<Tag> save(String name);
    Tag edit(Long Id, String name, String description);
    void deleteById(Long Id);
}
