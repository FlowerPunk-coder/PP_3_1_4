package ru.kata.spring.boot_security.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.kata.spring.boot_security.demo.dto.RoleDto;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

@Mapper
public interface RoleMapper {

    Role toEntity(RoleDto roleDto);
    @Mapping(target = "title", source = "role.title")
    RoleDto toDto(Role role);
    default List<RoleDto> toDtos(List<Role> roles) {
        return roles.stream().map(this::toDto).toList();
    }
}
