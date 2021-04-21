package mk.ukim.finki.finkiqa.service.impl;

import mk.ukim.finki.finkiqa.model.Answer;
import mk.ukim.finki.finkiqa.model.Question;
import mk.ukim.finki.finkiqa.model.Tag;
import mk.ukim.finki.finkiqa.model.User;
import mk.ukim.finki.finkiqa.repository.AnswerRepository;
import mk.ukim.finki.finkiqa.repository.QuestionRepository;
import mk.ukim.finki.finkiqa.repository.TagRepository;
import mk.ukim.finki.finkiqa.repository.UserRepository;
import mk.ukim.finki.finkiqa.service.QuestionService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final AnswerRepository answerRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository,
                               UserRepository userRepository,
                               TagRepository tagRepository,
                               AnswerRepository answerRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
        this.answerRepository = answerRepository;
    }

    @Override
    public List<Question> listAll() {

        Comparator<Question> dateComparator = (c1, c2) -> {
            if (c1.getPosted().isBefore(c2.getPosted())) return -1;
            else return 1;
        };

        return this.questionRepository.findAll().stream().sorted(dateComparator.reversed()).collect(Collectors.toList());
    }

    @Override
    public Optional<Question> getQuestionById(Long Id) {
        return this.questionRepository.findById(Id);
    }

    @Override
    @Transactional
    public Optional<Question> save(String title, String description, Long likes, Long dislikes, String userId, List<String> tags) {
        User user = this.userRepository.findByUsername(userId)
                .orElseThrow(() -> new IllegalArgumentException());

        List<Long> convertedTags = tags.stream().map(Long::parseLong).collect(Collectors.toList());

        List<Tag> tagsForQuestion = this.tagRepository.findAllById(convertedTags);

        return Optional.of(this.questionRepository.save(new Question(title, description, likes, dislikes, user, tagsForQuestion)));
    }

    @Override
    public Optional<Question> edit(Long Id, String title, String description, Long likes, Long dislikes, String userId, List<String> tags) {
        Question question = this.getQuestionById(Id).orElseThrow(IllegalAccessError::new);
        User user = this.userRepository.findByUsername(userId)
                .orElseThrow(() -> new IllegalArgumentException());

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
    public Optional<Question> likeQuestionById(Long id, String username) {
        Question question = this.getQuestionById(id).orElseThrow(IllegalArgumentException::new);
        User user = this.userRepository.findByUsername(username).orElseThrow(IllegalArgumentException::new);
        List<User> usersLiked = question.getLikedByUsers();
        Long currentLikes = question.getLikes();

        if (!usersLiked.contains(user)) {
            currentLikes += 1;
            usersLiked.add(user);
            question.setLikedByUsers(usersLiked);
        } else {
            currentLikes -= 1;
            usersLiked.remove(user);
            question.setLikedByUsers(usersLiked);
        }

        question.setLikes(currentLikes);
        return Optional.of(this.questionRepository.save(question));
    }

    @Override
    public Optional<Question> dislikeQuestionById(Long id, String username) {
        Question question = this.getQuestionById(id).orElseThrow(IllegalArgumentException::new);
        User user = this.userRepository.findByUsername(username).orElseThrow(IllegalArgumentException::new);
        List<User> usersDisliked = question.getDislikedByUsers();
        Long currentDislikes = question.getDislikes();

        if (!usersDisliked.contains(user)) {
            currentDislikes += 1;
            usersDisliked.add(user);
            question.setDislikedByUsers(usersDisliked);
        } else {
            currentDislikes -= 1;
            usersDisliked.remove(user);
            question.setDislikedByUsers(usersDisliked);
        }

        question.setDislikes(currentDislikes);
        return Optional.of(this.questionRepository.save(question));
    }

    @Override
    public Optional<List<Tag>> searchTags(String pattern) {
        List<Tag> foundTags = this.tagRepository.findAllByNameContains(pattern).stream().sorted(Comparator.comparing(Tag::getName)).collect(Collectors.toList());

        return Optional.of(foundTags);
    }

    @Override
    public void deleteById(Long Id) {
        List<Answer> answers = this.answerRepository.findAllByQuestionId(Id);
        answers.stream().forEach(answer -> this.answerRepository.deleteById(answer.getId()));
        this.questionRepository.deleteById(Id);
    }
}
