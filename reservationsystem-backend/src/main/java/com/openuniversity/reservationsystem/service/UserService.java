package com.openuniversity.reservationsystem.service;

import com.openuniversity.reservationsystem.dto.user.CreateUserDTO;
import com.openuniversity.reservationsystem.dto.user.UserLoginDTO;
import com.openuniversity.reservationsystem.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    User createUser (CreateUserDTO createUserDTOs) throws Exception;

    boolean isUserNameExists(String userName);

    User login (UserLoginDTO userLoginDTO);

    List<UserLoginDTO> getAllUsers() throws Exception;

    User getUserById(Long id) throws Exception;

    User updateUser(Long id, User user) throws Exception;

    User getUserByUserName(String userName);

    void deleteUser(Long id) throws Exception;
}
