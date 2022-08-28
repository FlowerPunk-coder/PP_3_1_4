package ru.kata.spring.boot_security.demo.dto;

import lombok.Data;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.Set;

@Data
public class UserDto {
    private long id;
    private String name;
    private String lastName;
    private String email;
    private int age;
    private String password;
    private Set<Role> roles;

}
