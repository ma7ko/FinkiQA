package mk.ukim.finki.finkiqa.web.rest;

import mk.ukim.finki.finkiqa.model.Question;
import mk.ukim.finki.finkiqa.model.Tag;
import mk.ukim.finki.finkiqa.model.dto.TagDto;
import mk.ukim.finki.finkiqa.service.QuestionService;
import mk.ukim.finki.finkiqa.service.TagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://localhost:3000")
@RequestMapping("/api/tags")
public class TagRestController {

    private final TagService tagService;
    private final QuestionService questionService;

    public TagRestController(TagService tagService,
                             QuestionService questionService) {
        this.tagService = tagService;
        this.questionService = questionService;
    }

    @GetMapping
    public List<Tag> listAllTags() {
        return this.tagService.listAll();
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity deleteTag(@PathVariable Long id) {
        this.tagService.deleteById(id);
        if(this.tagService.getTagById(id).isEmpty())
            return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();

    }


    @PostMapping("/add")
    public ResponseEntity<Tag> save(@RequestBody TagDto tagDto) {
        return this.tagService.save(tagDto.getName())
                .map(tag -> ResponseEntity.ok().body(tag))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }


    @GetMapping("/question/{id}")
    public List<Tag> listTagsForQuestionId (@PathVariable Long id) {
        Question question = this.questionService.getQuestionById(id).orElseThrow(IllegalAccessError::new);
        return question.getTags();
    }
}
