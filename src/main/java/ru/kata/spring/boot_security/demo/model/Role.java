package ru.kata.spring.boot_security.demo.model;

import org.springframework.security.core.GrantedAuthority;
import ru.kata.spring.boot_security.demo.model.enums.RoleName;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true, nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleName role;

    public Role() {}

    public Role(RoleName role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return getRole();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRole() {
        return role.name();
    }

    public void setRole(RoleName role) {
        this.role = role;
    }

    public String getTitle() {
       return role.getTitle();
    }

    @Override
    public String toString() {
        return role.getTitle();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role1 = (Role) o;
        return role == role1.role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(role);
    }
}
