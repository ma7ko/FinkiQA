package mk.ukim.finki.finkiqa.web.rest;

import mk.ukim.finki.finkiqa.model.Answer;
import mk.ukim.finki.finkiqa.model.Question;
import mk.ukim.finki.finkiqa.model.Tag;
import mk.ukim.finki.finkiqa.model.dto.QuestionDto;
import mk.ukim.finki.finkiqa.service.AnswerService;
import mk.ukim.finki.finkiqa.service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://localhost:3000")
@RequestMapping("/api/questions")
public class QuestionRestController {

    private final QuestionService questionService;
    private final AnswerService answerService;

    public QuestionRestController(QuestionService questionService,
                                  AnswerService answerService) {
        this.questionService = questionService;
        this.answerService = answerService;
    }

    @GetMapping
    public List<Question> listAllQuestions() {
        return this.questionService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> findById(@PathVariable Long id) {
        return this.questionService.getQuestionById(id)
                .map(question -> ResponseEntity.ok().body(question))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/answers")
    public List<Answer> listAllAnswersByQuestionId(@PathVariable Long id) {
        return this.answerService.getAnswersFromQuestionId(id);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity deleteQuestion(@PathVariable Long id) {
        this.questionService.deleteById(id);
        if(this.questionService.getQuestionById(id).isEmpty())
            return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();

    }

    @PostMapping("/add")
    public ResponseEntity<Question> save(@RequestBody QuestionDto questionDto) {
        return this.questionService.save(questionDto.getTitle(), questionDto.getDescription(), questionDto.getLikes(), questionDto.getDislikes(), questionDto.getUserId(), questionDto.getTags())
                .map(question -> ResponseEntity.ok().body(question))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<Question> edit(@PathVariable Long id, @RequestBody QuestionDto questionDto) {
        return this.questionService.edit(id, questionDto.getTitle(), questionDto.getDescription(), questionDto.getLikes(), questionDto.getDislikes(), questionDto.getUserId(), questionDto.getTags())
                .map(question -> ResponseEntity.ok().body(question))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/{id}/like-by/{userId}")
    public ResponseEntity<Question> likeQuestion(@PathVariable Long id, @PathVariable String userId) {
        return this.questionService.likeQuestionById(id, userId)
                .map(question -> ResponseEntity.ok().body(question))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/dislike-by/{userId}")
    public ResponseEntity<Question> dislikeQuestion(@PathVariable Long id, @PathVariable String userId) {
        return this.questionService.dislikeQuestionById(id, userId)
                .map(question -> ResponseEntity.ok().body(question))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/find-tags-containing/{pattern}")
    public ResponseEntity<List<Tag>> findTags(@PathVariable String pattern) {
        return this.questionService.searchTags(pattern)
                .map(tags -> ResponseEntity.ok().body(tags))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
