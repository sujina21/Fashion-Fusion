package com.example.demo.services.impl;

import com.example.demo.dto.ProductDto;
import com.example.demo.entities.Product;
import com.example.demo.repos.ProductRepo;
import com.example.demo.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepo productRepo;

    @Value("${project.uploads}")
    private String mainPath;

    @Override
    public Product createProduct(ProductDto product) {

        String fileName = UUID.randomUUID() + "-" + product.getImage().getOriginalFilename();
        System.out.println(fileName);
        Path parentPath = Paths.get(mainPath, fileName);
        try {
            Files.copy(product.getImage().getInputStream(), parentPath);
        } catch (IOException e) {
            e.printStackTrace();
        }

        Product newProduct = Product.builder().title(product.getTitle())
                .description(product.getDescription())
                .price(product.getPrice()).
                image(fileName).
                build();

        return productRepo.save(newProduct);
    }

    @Override
    public List<Product> getAll() {
        return productRepo.findAll();
    }

    @Override
    public void deleteProduct(Integer productId) {
        productRepo.deleteById(productId);
    }

    @Override
    public Product getOne(Integer id) {
        return productRepo.findById(id).get();
    }

    @Override
    public Product updateProduct(Product product) {


        return productRepo.save(product);
    }

    @Override
    public Product findProduct(Integer id) {
        return productRepo.findById(id).get();
    }
}
