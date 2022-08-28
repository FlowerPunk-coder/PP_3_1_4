package ru.kata.spring.boot_security.demo.model.enums;

public enum RoleName {
    ROLE_ADMIN("Администратор"), ROLE_USER("Пользователь");

    private String title;

    RoleName(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
