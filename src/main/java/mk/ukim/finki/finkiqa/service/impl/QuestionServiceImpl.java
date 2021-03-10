package mk.ukim.finki.finkiqa.service.impl;

import mk.ukim.finki.finkiqa.model.Question;
import mk.ukim.finki.finkiqa.model.Tag;
import mk.ukim.finki.finkiqa.model.User;
import mk.ukim.finki.finkiqa.repository.QuestionRepository;
import mk.ukim.finki.finkiqa.repository.TagRepository;
import mk.ukim.finki.finkiqa.repository.UserRepository;
import mk.ukim.finki.finkiqa.service.QuestionService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository,
                               UserRepository userRepository,
                               TagRepository tagRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
    }

    @Override
    public List<Question> listAll() {
        return this.questionRepository.findAll();
    }

    @Override
    public Optional<Question> getQuestionById(Long Id) {
        return this.questionRepository.findById(Id);
    }

    @Override
    @Transactional
    public Optional<Question> save(String title, String description, Long likes, Long dislikes, String username, List<String> tags) {
        User user = this.userRepository.findById(username)
                .orElseThrow(() -> new IllegalArgumentException(username));

        List<Long> convertedTags = tags.stream().map(Long::parseLong).collect(Collectors.toList());

        List<Tag> tagsForQuestion = this.tagRepository.findAllById(convertedTags);

        return Optional.of(this.questionRepository.save(new Question(title, description, likes, dislikes, user, tagsForQuestion)));
    }

    @Override
    public Optional<Question> edit(Long Id, String title, String description, Long likes, Long dislikes, String username, List<String> tags) {
        Question question = this.getQuestionById(Id).orElseThrow(IllegalAccessError::new);
        User user = this.userRepository.findById(username)
                .orElseThrow(() -> new IllegalArgumentException(username));

        List<Tag> selectedTags = new ArrayList<>();

        tags.forEach(tag -> {
            if(!tag.isEmpty()) {
                Long tagId = Long.parseLong(tag);
                Tag t = this.tagRepository.findById(tagId).orElseThrow(IllegalArgumentException::new);
                selectedTags.add(t);
            }
        });

        question.setTitle(title);
        question.setDescription(description);
        question.setLikes(likes);
        question.setDislikes(dislikes);
        question.setUser(user);
        question.setTags(selectedTags);

        return Optional.of(this.questionRepository.save(question));
    }

    @Override
    public Optional<Question> likeQuestionById(Long id) {
        Question question = this.getQuestionById(id).orElseThrow(IllegalAccessError::new);
        Long currentLikes = question.getLikes();

        currentLikes += 1;

        question.setLikes(currentLikes);
        return Optional.of(this.questionRepository.save(question));
    }

    @Override
    public Optional<Question> dislikeQuestionById(Long id) {
        Question question = this.getQuestionById(id).orElseThrow(IllegalAccessError::new);
        Long currentDislikes = question.getDislikes();

        currentDislikes += 1;

        question.setDislikes(currentDislikes);
        return Optional.of(this.questionRepository.save(question));
    }

    @Override
    public void deleteById(Long Id) {
        this.questionRepository.deleteById(Id);
    }
}
