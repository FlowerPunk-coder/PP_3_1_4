package ru.kata.spring.boot_security.demo.dto;

import lombok.Data;
import ru.kata.spring.boot_security.demo.model.enums.RoleName;

@Data
public class RoleDto {

    private long id;
    private RoleName role;
    private String title;
}
