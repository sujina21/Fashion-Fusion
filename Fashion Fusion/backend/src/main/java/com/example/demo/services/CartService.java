package com.example.demo.services;

import com.example.demo.entities.Cart;
import com.example.demo.entities.User;

public interface CartService {
    Cart createCart(User user);
}
