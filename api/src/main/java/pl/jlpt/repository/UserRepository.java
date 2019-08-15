package pl.jlpt.repository;

import org.springframework.data.repository.CrudRepository;
import pl.jlpt.entity.User;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findByEmail(String email);

}
