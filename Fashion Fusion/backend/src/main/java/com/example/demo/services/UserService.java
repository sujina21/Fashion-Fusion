package com.example.demo.services;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.CartItem;
import com.example.demo.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    boolean ifUserExists(String email);

    List<CartItem> getCartItems();

    void addToCart(User user, Integer productId, int i);

    public void removeFromCart(User user, Integer productId);

    User findByEmail(String email);

    User findUser(Integer id);

    User updateUser(User existingUser);
}
