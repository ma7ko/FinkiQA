package mk.ukim.finki.finkiqa.service.impl;

import mk.ukim.finki.finkiqa.model.Question;
import mk.ukim.finki.finkiqa.model.Tag;
import mk.ukim.finki.finkiqa.repository.QuestionRepository;
import mk.ukim.finki.finkiqa.repository.TagRepository;
import mk.ukim.finki.finkiqa.service.TagService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private final QuestionRepository questionRepository;

    public TagServiceImpl(TagRepository tagRepository,
                          QuestionRepository questionRepository) {
        this.tagRepository = tagRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public List<Tag> listAll() {
        Comparator<Tag> nameComparator = Comparator.comparing(Tag::getName);
        return this.tagRepository.findAll().stream().sorted(nameComparator).collect(Collectors.toList());
    }

    @Override
    public Optional<Tag> getTagById(Long Id) {
        return this.tagRepository.findById(Id);
    }

    @Override
    public Optional<Tag> save(String name) {
        return Optional.of(this.tagRepository.save(new Tag(name)));
    }

    @Override
    public Tag edit(Long Id, String name, String description) {
        return null;
    }

    @Override
    public void deleteById(Long Id) {
        List<Question> questions = this.questionRepository.findAll();

        questions.stream().forEach(question -> {
            List<Tag> newTags = question.getTags().stream().filter(tag -> !tag.getId().equals(Id)).collect(Collectors.toList());
            if (newTags.size() != question.getTags().size()) {
                question.setTags(newTags);
                this.questionRepository.save(question);
            }
        });

        this.tagRepository.deleteById(Id);
    }
}
