package com.tyb.tyb_backend.dto;

import com.tyb.tyb_backend.constant.UserRoleEnum;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;

/**
 * DTO for {@link com.tyb.tyb_backend.model.User}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements Serializable {

    @NotNull(message = "L'username è obbligatorio")
    String username;
    String name;
    String surname;
    @NotNull(message = "Il ruolo è obbligatorio")
    UserRoleEnum role;
    String email;
    @NotNull (message = "La password è obbligatoria")
    String password;
}
