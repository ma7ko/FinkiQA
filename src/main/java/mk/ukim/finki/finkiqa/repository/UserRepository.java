package mk.ukim.finki.finkiqa.repository;

import mk.ukim.finki.finkiqa.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
}
