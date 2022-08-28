package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.dto.UserDto;

import java.util.List;

public interface UserService {

    List<UserDto> getAllUsers();
    UserDto getUserById(long id);
    void saveUser(UserDto user);
    void updateUser(UserDto updateUser);
    void deleteUserById(long id);
    UserDto findByEmail(String email);

}
