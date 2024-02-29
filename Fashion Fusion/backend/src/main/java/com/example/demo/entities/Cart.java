package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name = "carts_tbl")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cart {
    @Id
    @SequenceGenerator(allocationSize = 1,
            name = "carts_gen_id",
            sequenceName = "carts_gen_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "carts_gen_id")
    private Integer id;
    private Double totalPrice;

    @OneToOne
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "id"
    )
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<CartItem> cartItems;

}