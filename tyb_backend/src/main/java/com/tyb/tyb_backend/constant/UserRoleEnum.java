package com.tyb.tyb_backend.constant;

public enum UserRoleEnum {
        PROFESSORE("P"),
        STUDENTE("S"),
        ADMIN("A");


    private final String description;

    UserRoleEnum(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
