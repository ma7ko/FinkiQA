package mk.ukim.finki.finkiqa;

import mk.ukim.finki.finkiqa.model.Answer;
import mk.ukim.finki.finkiqa.model.Question;
import mk.ukim.finki.finkiqa.model.Role;
import mk.ukim.finki.finkiqa.model.Tag;
import mk.ukim.finki.finkiqa.repository.AnswerRepository;
import mk.ukim.finki.finkiqa.repository.QuestionRepository;
import mk.ukim.finki.finkiqa.repository.TagRepository;
import mk.ukim.finki.finkiqa.repository.UserRepository;
import mk.ukim.finki.finkiqa.service.QuestionService;
import mk.ukim.finki.finkiqa.service.impl.QuestionServiceImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

@RunWith(MockitoJUnitRunner.class)
public class QuestionServiceTests {


    @Mock
    private QuestionService questionService;

    @Mock
    private TagRepository tagRepository;

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AnswerRepository answerRepository;


    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        Tag tag = new Tag("web programming");
        Mockito.when(this.tagRepository.save(Mockito.any(Tag.class))).thenReturn(tag);
        Question q = new Question();
        Mockito.when(this.questionRepository.save(Mockito.any(Question.class))).thenReturn(q);
        Answer a = new Answer();
        Mockito.when(this.tagRepository.save(Mockito.any(Tag.class))).thenReturn(tag);
    }

    @Test
    public void testSuccessRegister() {
        Tag tag = new Tag("web programming");
        Mockito.when(this.tagRepository.save(Mockito.any(Tag.class))).thenReturn(tag);
        Question q = new Question();
        Mockito.when(this.questionRepository.save(Mockito.any(Question.class))).thenReturn(q);
        Answer a = new Answer();


        Assert.assertNotNull("User is null", tag);
        Assert.assertNotNull("name do not mach", a);
        Assert.assertNotNull("role do not mach", tag);
        Assert.assertNotNull("surename do not mach", tag);
        Assert.assertNotNull("password do not mach",tag);
    }


}