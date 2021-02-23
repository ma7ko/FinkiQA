package mk.ukim.finki.finkiqa.repository;

import mk.ukim.finki.finkiqa.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
