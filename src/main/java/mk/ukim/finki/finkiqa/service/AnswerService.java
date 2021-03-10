package mk.ukim.finki.finkiqa.service;

import mk.ukim.finki.finkiqa.model.Answer;

import java.util.List;
import java.util.Optional;

public interface AnswerService {
    List<Answer> listAll();
    List<Answer> getAnswersFromQuestionId(Long id);
    Optional<Answer> getAnswerById(Long Id);
    Optional<Answer> save(String explanation, Long likes, Long dislikes, Long questionId, String userId);
    Optional<Answer> edit(Long Id, String explanation, Long likes, Long dislikes, Long questionId, String username);
    Optional<Answer> likeAnswerById(Long id);
    Optional<Answer> dislikeAnswerById(Long id);
    void deleteById(Long Id);
}
