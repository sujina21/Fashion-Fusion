package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigInteger;

@Table(name = "users_tbl")
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @SequenceGenerator(allocationSize = 1,
            name = "users_gen_id",
            sequenceName = "users_gen_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_gen_id")
    private Integer id;
    private String username;
    private String email;
    private String password;
    private String role;
    private BigInteger phone_number;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private Cart cart;
}
