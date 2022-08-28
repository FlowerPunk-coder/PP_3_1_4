package ru.kata.spring.boot_security.demo.mapper;

import org.mapstruct.Mapper;
import ru.kata.spring.boot_security.demo.dto.UserDto;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

@Mapper
public interface UserMapper {

    User toEntity(UserDto userDto);

    UserDto toDto(User user);
    default List<UserDto> toDtos(List<User> users) {
        return users.stream().map(this::toDto).toList();
    }

    default List<User> toEntities(List<UserDto> userDtos) {
        return userDtos.stream().map(this::toEntity).toList();
    }
}
