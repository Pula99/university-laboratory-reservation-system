package com.openuniversity.reservationsystem.controller;

import com.openuniversity.reservationsystem.dto.user.CreateUserDTO;
import com.openuniversity.reservationsystem.dto.user.UpdateUserDTO;
import com.openuniversity.reservationsystem.dto.user.UserLoginDTO;
import com.openuniversity.reservationsystem.model.User;
import com.openuniversity.reservationsystem.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "http://http://localhost:3000/")
@AllArgsConstructor
@RestController
@RequestMapping("${endpoint.users}")
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;

    @PostMapping("/register")
    public ResponseEntity<String> createUser(@RequestBody CreateUserDTO registrationDTO) {
        try {
            userService.createUser(registrationDTO);
            return ResponseEntity.ok("User registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during registration");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody UserLoginDTO userLoginDTO){
        User user = userService.login(userLoginDTO);
        if(user != null){
            return ResponseEntity.ok("login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<User> updateUser( @PathVariable Long id, @Valid @RequestBody UpdateUserDTO updateUserDTO){
        try {
            User user = modelMapper.map(updateUserDTO,User.class);
            User newUpdatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(newUpdatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/usersDetails")
    public List<UserLoginDTO> getAllUsers(){
        try {
            return userService.getAllUsers();
        } catch (Exception e){
            throw  new RuntimeException(e);
        }
    }

//    @GetMapping("{id}")
//    public ResponseEntity<User> getUserById (@PathVariable Long id){
//        try {
//            User user = userService.getUserById(id);
//            return ResponseEntity.ok(user);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }

    @DeleteMapping("{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{userName}")
    public ResponseEntity<User> getUserByUserName(@PathVariable String userName) {
            User user = userService.getUserByUserName(userName);
                    if(user != null){
                        return ResponseEntity.ok(user);
                    } else {
                        return ResponseEntity.notFound().build();
                    }
    }


}

