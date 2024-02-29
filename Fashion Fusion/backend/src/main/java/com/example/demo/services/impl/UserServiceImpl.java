package com.example.demo.services.impl;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.Cart;
import com.example.demo.entities.CartItem;
import com.example.demo.entities.Product;
import com.example.demo.entities.User;
import com.example.demo.repos.CartItemRepo;
import com.example.demo.repos.CartRepo;
import com.example.demo.repos.ProductRepo;
import com.example.demo.repos.UserRepo;
import com.example.demo.services.UserService;
import com.example.demo.utils.PasswordEncoderUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final CartRepo cartRepo;
    private final UserRepo userRepo;
    private final ProductRepo productRepo;
    private final CartItemRepo cartItemRepository;

    @Override
    public boolean ifUserExists(String email) {
        return userRepo.existsByEmail(email);
    }

    @Override
    public List<CartItem> getCartItems() {
        return null;
    }

    @Override
    public void addToCart(User user, Integer productId, int quantity) {
        Cart cart = user.getCart();
        Product product = productRepo.findById(productId).get();

        List<CartItem> cartItems = cart.getCartItems();

        // Check if the product already exists in the cart
        for (CartItem cartItem : cartItems) {
            if (cartItem.getProduct().getId().equals(product.getId())) {
                // Update the quantity if the product already exists
                cartItem.setQuantity(cartItem.getQuantity() + quantity);
                cartItemRepository.save(cartItem);
                double price = calculateTotalPrice(cartItems);
                cart.setTotalPrice(price);
                cartRepo.save(cart);
                return;
            }
        }

        // Create a new CartItem if the product doesn't exist in the cart
        CartItem newCartItem = new CartItem();
        newCartItem.setProduct(product);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(quantity);

        cartItems.add(newCartItem);

        cartItemRepository.save(newCartItem);
        double price = calculateTotalPrice(cartItems);
        cart.setTotalPrice(price);
        cartRepo.save(cart);
    }

    private Double calculateTotalPrice(List<CartItem> cartItems) {
        double totalPrice = 0.0;

        for (CartItem cartItem : cartItems) {
            Double productPrice = cartItem.getProduct().getPrice();
            int quantity = cartItem.getQuantity();
            double itemPrice = productPrice * quantity;
            totalPrice = totalPrice + itemPrice;
        }

        return totalPrice;
    }

    // DELETE ITEMS FROM THE CART
    @Override
    public void removeFromCart(User user, Integer productId) {
        Cart cart = user.getCart();
        List<CartItem> cartItems = cart.getCartItems();

        for (Iterator<CartItem> iterator = cartItems.iterator(); iterator.hasNext(); ) {
            CartItem cartItem = iterator.next();
            if (cartItem.getProduct().getId().equals(productId)) {
                int currentQuantity = cartItem.getQuantity();
                if (currentQuantity > 1) {
                    cartItem.setQuantity(currentQuantity - 1);
                    cartItemRepository.save(cartItem);
                } else {
                    iterator.remove();
                    cartItemRepository.delete(cartItem);
                }

                double price = calculateTotalPrice(cartItems);
                cart.setTotalPrice(price);
                cartRepo.save(cart);
                return;
            }
        }
    }

    @Override
    public User findByEmail(String email) {
        return userRepo.findByEmail(email).get();
    }

    @Override
    public User findUser(Integer id) {
        return userRepo.findById(id).get();
    }

    @Override
    public User updateUser(User existingUser) {
        return userRepo.save(existingUser);
    }


}
