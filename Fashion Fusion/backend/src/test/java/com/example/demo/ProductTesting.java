package com.example.demo;

import com.example.demo.entities.Product;
import com.example.demo.repos.ProductRepo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ProductTesting {
    @Autowired
    private ProductRepo productRepo;

    @Test
    @Order(1)
    @Rollback(value = false)

    public void saveProductTest() {

        Product product = Product.builder()
                .title("Shoes")
                .price(22.22)
                .description("Comfortable for all situations")
                .build();

        productRepo.save(product);
        Assertions.assertThat(product.getId()).isGreaterThan(0);

    }

    @Test
    @Order(2)
    public void getProductTest() {
        Product prod = productRepo.findById(1).get();
        Assertions.assertThat(prod.getId()).isEqualTo(1);
    }

    @Test
    @Order(3)
    public void getListOfProductTest() {
        List<Product> prodList = productRepo.findAll();
        Assertions.assertThat(prodList.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateProductPriceTest() {
        Product prod = productRepo.findById(1).get();
        prod.setPrice(99.99);
        Product productUpdated = productRepo.save(prod);
        Assertions.assertThat(productUpdated.getPrice()).isEqualTo(99.99);

    }

    @Test
    @Order(5)
    @Rollback(value = false)
    public void deleteProductTest() {
        Product prod = productRepo.findById(1).get();
        productRepo.delete(prod);

        Product prod1 = null;
        Optional<Product> isMsg = productRepo.findById(1);
        if (isMsg.isPresent()) {
            prod1 = isMsg.get();
        }
        Assertions.assertThat(prod1).isNull();
    }
}
