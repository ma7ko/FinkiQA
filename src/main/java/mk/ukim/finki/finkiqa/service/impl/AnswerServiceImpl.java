package mk.ukim.finki.finkiqa.service.impl;

import mk.ukim.finki.finkiqa.model.Answer;
import mk.ukim.finki.finkiqa.model.Question;
import mk.ukim.finki.finkiqa.model.User;
import mk.ukim.finki.finkiqa.repository.AnswerRepository;
import mk.ukim.finki.finkiqa.repository.QuestionRepository;
import mk.ukim.finki.finkiqa.repository.UserRepository;
import mk.ukim.finki.finkiqa.service.AnswerService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class AnswerServiceImpl implements AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public AnswerServiceImpl(AnswerRepository answerRepository,
                             QuestionRepository questionRepository,
                             UserRepository userRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Answer> listAll() {
        return this.answerRepository.findAll();
    }

    @Override
    public Optional<Answer> getAnswerById(Long Id) {
        return this.answerRepository.findById(Id);
    }

    @Override
    public List<Answer> getAnswersFromQuestionId(Long id) {
        return this.answerRepository.findAllByQuestionId(id);
    }

    @Override
    @Transactional
    public Optional<Answer> save(String explanation, Long likes, Long dislikes, Long questionId, String userId) {
        Question question = this.questionRepository.findById(questionId).orElseThrow(IllegalAccessError::new);
        User user = this.userRepository.findById(userId).orElseThrow(IllegalAccessError::new);

        return Optional.of(this.answerRepository.save(new Answer(explanation, likes, dislikes, question, user)));
    }

    @Override
    public Optional<Answer> edit(Long Id, String explanation, Long likes, Long dislikes, Long questionId, String username) {
        Answer answer = this.answerRepository.findById(Id).orElseThrow(IllegalAccessError::new);

        answer.setExplanation(explanation);
        answer.setLikes(likes);
        answer.setDislikes(dislikes);

        Question question = this.questionRepository.findById(questionId).orElseThrow(IllegalAccessError::new);
        answer.setQuestion(question);
        User user = this.userRepository.findById(username).orElseThrow(IllegalAccessError::new);
        answer.setUser(user);

        return Optional.of(this.answerRepository.save(new Answer(explanation, likes, dislikes, question, user)));

    }

    @Override
    public Optional<Answer> likeAnswerById(Long id) {
        Answer answer = this.answerRepository.findById(id).orElseThrow(IllegalAccessError::new);
        Long currentLikes = answer.getLikes();

        currentLikes += 1;

        answer.setLikes(currentLikes);
        return Optional.of(this.answerRepository.save(answer));
    }

    @Override
    public Optional<Answer> dislikeAnswerById(Long id) {
        Answer answer = this.answerRepository.findById(id).orElseThrow(IllegalAccessError::new);
        Long currentDislikes = answer.getDislikes();

        currentDislikes += 1;

        answer.setDislikes(currentDislikes);
        return Optional.of(this.answerRepository.save(answer));
    }

    @Override
    public void deleteById(Long Id) {
        this.answerRepository.deleteById(Id);
    }
}
