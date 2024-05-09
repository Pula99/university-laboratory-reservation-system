package com.openuniversity.reservationsystem.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDTO {

    private Long id;
    private String userName;
    private String password;
    private String email;
    private String role;
}
