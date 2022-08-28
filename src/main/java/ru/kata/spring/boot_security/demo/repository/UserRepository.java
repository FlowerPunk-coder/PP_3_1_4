package ru.kata.spring.boot_security.demo.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.Optional;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, Long> {
    @EntityGraph(value = "User.role", type = EntityGraph.EntityGraphType.LOAD)
    @Query("select u from User u where u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);

    @EntityGraph(value = "User.role", type = EntityGraph.EntityGraphType.LOAD)
    @Query("select u from User u where u.id = :id")
    User getUserById(@Param("id") long id);
}
