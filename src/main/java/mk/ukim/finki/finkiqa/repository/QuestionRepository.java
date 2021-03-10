package mk.ukim.finki.finkiqa.repository;

import mk.ukim.finki.finkiqa.model.Question;
import mk.ukim.finki.finkiqa.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
