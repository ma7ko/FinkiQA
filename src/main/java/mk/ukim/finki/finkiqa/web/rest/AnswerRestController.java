package mk.ukim.finki.finkiqa.web.rest;

import mk.ukim.finki.finkiqa.model.Answer;
import mk.ukim.finki.finkiqa.model.Question;
import mk.ukim.finki.finkiqa.model.dto.AnswerDto;
import mk.ukim.finki.finkiqa.service.AnswerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://localhost:3000")
@RequestMapping("/api/answers")
public class AnswerRestController {

    private final AnswerService answerService;

    public AnswerRestController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Answer> findById(@PathVariable Long id) {
        return this.answerService.getAnswerById(id)
                .map(answer -> ResponseEntity.ok().body(answer))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Answer> save(@RequestBody AnswerDto answerDto) {
        return this.answerService.save(answerDto.getExplanation(), answerDto.getLikes(), answerDto.getDislikes(), answerDto.getQuestionId(), answerDto.getUserId())
                .map(answer -> ResponseEntity.ok().body(answer))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity deleteAnswer(@PathVariable Long id) {
        this.answerService.deleteById(id);
        if(this.answerService.getAnswerById(id).isEmpty())
            return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();

    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<Answer> edit(@PathVariable Long id, @RequestBody AnswerDto answerDto) {
        return this.answerService.edit(id, answerDto.getExplanation(), answerDto.getLikes(), answerDto.getDislikes(), answerDto.getQuestionId(), answerDto.getUserId())
                .map(answer -> ResponseEntity.ok().body(answer))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/{id}/like-by/{username}")
    public ResponseEntity<Answer> likeAnswer(@PathVariable Long id, @PathVariable String username) {
        return this.answerService.likeAnswerById(id, username)
                .map(answer -> ResponseEntity.ok().body(answer))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/dislike-by/{username}")
    public ResponseEntity<Answer> dislikeAnswer(@PathVariable Long id, @PathVariable String username) {
        return this.answerService.dislikeAnswerById(id, username)
                .map(answer -> ResponseEntity.ok().body(answer))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
