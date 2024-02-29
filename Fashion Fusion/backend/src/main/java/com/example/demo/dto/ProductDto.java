package com.example.demo.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private String title;
    private String description;
    private Double price;
    private MultipartFile image;
}
