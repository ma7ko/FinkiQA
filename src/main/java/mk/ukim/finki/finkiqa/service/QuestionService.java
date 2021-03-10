package mk.ukim.finki.finkiqa.service;

import mk.ukim.finki.finkiqa.model.Question;

import java.util.List;
import java.util.Optional;

public interface QuestionService {
    List<Question> listAll();
    Optional<Question> getQuestionById(Long Id);
    Optional<Question> save(String title, String description, Long likes, Long dislikes, String username, List<String> tags);
    Optional<Question> edit(Long Id, String title, String description, Long likes, Long dislikes, String username, List<String> tags);
    Optional<Question> likeQuestionById(Long id);
    Optional<Question> dislikeQuestionById(Long id);
    void deleteById(Long Id);
}
