package com.example.demo.services.impl;

import com.example.demo.entities.Cart;
import com.example.demo.entities.User;
import com.example.demo.repos.CartRepo;
import com.example.demo.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepo cartRepo;

    @Override
    public Cart createCart(User user) {
        Cart newCart = Cart.builder()
                .user(user)
                .totalPrice(0.0)
                .build();
        return cartRepo.save(newCart);
    }
}
