package com.example.demo.controllers;

import com.example.demo.config.JwtService;
import com.example.demo.dto.ProductDto;
import com.example.demo.entities.CartItem;
import com.example.demo.entities.Product;
import com.example.demo.entities.User;
import com.example.demo.repos.UserRepo;
import com.example.demo.services.CustomUserDetailsService;
import com.example.demo.services.ProductService;
import com.example.demo.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class ApiController {

    private final ProductService productService;
    private final JwtService jwtService;
    private final UserService userService;
    private final UserRepo userRepo;

    private final CustomUserDetailsService customUserDetailsService;

    @GetMapping("/api/user/profile")
    public User getUser() {
        System.out.println("CONTROLLER HIT");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepo.findByEmail(email).get();
        System.out.println(email);
        return user;
    }

    @PatchMapping("/api/user/profile/update/{id}")
    public User updateUserProfile(@PathVariable("id") Integer id, @RequestBody User updateRequest) {
        var existingUser = userService.findUser(id);
        System.out.println(existingUser.getUsername());
        System.out.println(existingUser.getEmail());
        System.out.println(updateRequest.getEmail());
        System.out.println(updateRequest.getUsername());

        if (updateRequest.getPassword() != null) {
            existingUser.setPassword(updateRequest.getPassword());
        }

        if (updateRequest.getEmail() != null) {
            existingUser.setEmail(updateRequest.getEmail());
        }

        if (updateRequest.getUsername() != null) {
            existingUser.setUsername(updateRequest.getUsername());
        }

        if (updateRequest.getPhone_number().toString().length() <9) {
            existingUser.setPhone_number(updateRequest.getPhone_number());
        }

        System.out.println(existingUser.getUsername());
        return userService.updateUser(existingUser);

    }

    @PostMapping("/admin/api/products/create")
    public ResponseEntity<Product> createProduct(@ModelAttribute ProductDto product) {
        System.out.println("Controller hit");
        System.out.println(product.getImage().getOriginalFilename());
        var newP = productService.createProduct(product);
        return ResponseEntity.ok(newP);
    }

    @DeleteMapping("/admin/api/products/delete/{productId}")
    public void deleteProduct(@PathVariable("productId") Integer productId) {
        productService.deleteProduct(productId);
    }

    @PostMapping("/admin/test")
    public String testAD() {
        return "Test Success";
    }

    @GetMapping("/api/products/all")
    public List<Product> getAllProducts() {
        List<Product> allProducts = productService.getAll();
        return allProducts;
    }

    @GetMapping("/api/products/{id}")
    public Product getSingleProduct(@PathVariable("id") Integer id) {
        return productService.getOne(id);
    }

    @Value("${project.uploads}")
    private String mainPath;

    @PatchMapping("/admin/api/products/update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") Integer id, @ModelAttribute ProductDto updateRequest) {

        var existingProduct = productService.findProduct(id);
        if (updateRequest.getTitle() != null) {
            existingProduct.setTitle(updateRequest.getTitle());
        }
        if (updateRequest.getPrice() != null) {
            existingProduct.setPrice(updateRequest.getPrice());
        }
        if (updateRequest.getDescription() != null) {
            existingProduct.setDescription(updateRequest.getDescription());
        }

        MultipartFile imageFile = updateRequest.getImage();
        if (imageFile != null && !imageFile.isEmpty()) {
            String fileName = UUID.randomUUID() + "-" + updateRequest.getImage().getOriginalFilename();
            System.out.println(fileName);
            Path parentPath = Paths.get(mainPath, fileName);
            existingProduct.setImage(fileName);
            try {
                Files.copy(updateRequest.getImage().getInputStream(), parentPath);
            } catch (IOException e) {
                e.printStackTrace();
            }

        }


        var newP = productService.updateProduct(existingProduct);
        return ResponseEntity.ok(newP);
    }


    @GetMapping("/getCart")
    public List<CartItem> getCartItems() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();
        User user = userRepo.findByEmail(email).get();
        System.out.println(email);
        return user.getCart().getCartItems();
    }

    @PostMapping("/api/products/add-to-cart/{productId}")
    public void addToCart(@PathVariable Integer productId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();
//        User user = userService.findByEmail(email);
        User user = userRepo.findByEmail(email).get();

        System.out.println(email);
        userService.addToCart(user, productId, 1);
    }

    @PostMapping("/api/validate-token")
    public ResponseEntity<?> validateToken(
            @RequestHeader("Authorization") String tokenHeader
    ) {
        String token = tokenHeader.substring(7);
        String email = jwtService.extractEmail(token);
        System.out.println(email);
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
        boolean isValid = jwtService.isTokenValid(token, userDetails);
        System.out.println(isValid);
        if (isValid) {
            return ResponseEntity.ok(userDetails.getAuthorities().stream().findFirst());
        }
        return ResponseEntity.badRequest().body("Bad Request");
    }

    @DeleteMapping("/api/cart/{deleteId}")
    public void deleteCartItem(@PathVariable Integer deleteId) {
        System.out.println("DELETE REQUEST HIT FOR REMOVING CART ITEM");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();
//        User user = userService.findByEmail(email);
        User user = userRepo.findByEmail(email).get();
        userService.removeFromCart(user, deleteId);
    }
}
