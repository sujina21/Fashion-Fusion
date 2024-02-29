package com.example.demo.services;

import com.example.demo.dto.ProductDto;
import com.example.demo.entities.Product;

import java.util.List;

public interface ProductService {
    Product createProduct(ProductDto product);

    List<Product> getAll();

    void deleteProduct(Integer productId);

    Product getOne(Integer id);

    Product updateProduct(Product product);

    Product findProduct(Integer id);
}
