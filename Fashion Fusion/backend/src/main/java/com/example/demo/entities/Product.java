package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "products_tbl")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @SequenceGenerator(allocationSize = 1,
            name = "products_gen_id",
            sequenceName = "products_gen_id")
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "products_gen_id")
    private Integer id;
    private String title;
    private String description;
    private Double price;
    private String image;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<CartItem> cartItems;

    @Override
    public String toString() {
        // Incorrect implementation causing recursion
        return "Product Name: " + getTitle() + ", Price: " + getPrice();
    }

}
