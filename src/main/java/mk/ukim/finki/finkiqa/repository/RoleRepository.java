package mk.ukim.finki.finkiqa.repository;

import mk.ukim.finki.finkiqa.model.Role;
import mk.ukim.finki.finkiqa.model.enumeration.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
