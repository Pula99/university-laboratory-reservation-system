package com.openuniversity.reservationsystem.service.impl;

import com.openuniversity.reservationsystem.dto.user.CreateUserDTO;
import com.openuniversity.reservationsystem.dto.user.UserLoginDTO;
import com.openuniversity.reservationsystem.model.User;
import com.openuniversity.reservationsystem.repository.UserRepository;
import com.openuniversity.reservationsystem.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public User createUser(CreateUserDTO createUserDTO) {
        if(isUserNameExists(createUserDTO.getUserName())){
            throw  new IllegalArgumentException("Name already exists");
        }

        User user = new User();
        user.setUserName(createUserDTO.getUserName());
        user.setPassword(passwordEncoder.encode(createUserDTO.getPassword()));
        user.setEmail(createUserDTO.getEmail());
        user.setRole(createUserDTO.getRole());
        return userRepository.save(user);
    }

    @Override
    public User login(UserLoginDTO userLoginDTO) {
        try {
            User user = userRepository.findByUserName(userLoginDTO.getUserName());
            if (user != null && passwordEncoder.matches(userLoginDTO.getPassword(), user.getPassword())) {
                return user;
            } else {
                return null;
            }
        } catch (Exception exception) {
            log.error("Error occurred when getting User", exception);
            throw exception;
        }
    }



    @Override
    public List<UserLoginDTO> getAllUsers() {
        List<User> users = userRepository.findAll();

        List<UserLoginDTO> userLoginDTOS = users.stream().map(data -> {
            UserLoginDTO userLoginDTO = new UserLoginDTO();
            userLoginDTO.setId(data.getId());
            userLoginDTO.setEmail(data.getEmail());
            userLoginDTO.setUserName(data.getUserName());
            userLoginDTO.setPassword(passwordEncoder.encode(data.getPassword()));
            userLoginDTO.setRole(data.getRole());
            return userLoginDTO;
        }).collect(Collectors.toList());
        return userLoginDTOS;
    }

    @Override
    public User getUserById (Long id) {
        try {
            return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        } catch (Exception exception) {
            log.error("Error occured when getting User, Error{}", exception.getMessage());
            throw exception;
        }
    }

    @Override
    public User updateUser(Long id, User updatedUser) throws Exception {
        try {
            User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

            modelMapper.map(updatedUser, user);

            // Check if the password is provided and encode it if necessary
            if (updatedUser.getPassword() != null) {
                String encodedPassword = passwordEncoder.encode(updatedUser.getPassword());
                user.setPassword(encodedPassword);
            }

            return userRepository.save(user);
        } catch (Exception exception) {
            log.error("Error when Updating User, Error: {}", exception.getMessage());
            throw exception;
        }
    }

    @Override
    public void deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
        } catch (Exception exception) {
            log.error("Error occurred when deleting User, Error{}",exception.getMessage());
            throw exception;
        }
    }

    @Override
    public boolean isUserNameExists(String userName) {
        return userRepository.findByUserName(userName) != null;
    }

    @Override
    public User getUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

}
