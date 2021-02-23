package mk.ukim.finki.finkiqa.repository;

import mk.ukim.finki.finkiqa.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
