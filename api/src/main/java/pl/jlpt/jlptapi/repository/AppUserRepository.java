package pl.jlpt.jlptapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jlpt.jlptapi.entity.AppUser;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    List<AppUser> findByEmail(String email);

    Optional<AppUser> findByUsername(String username);

}
