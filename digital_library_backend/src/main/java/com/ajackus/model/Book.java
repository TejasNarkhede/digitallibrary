package com.ajackus.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title should be non-empty strings ")
    @Column(nullable = false, unique = true)
    private String title;

    @NotBlank(message = "Author should be non-empty strings ")
    @Column(nullable = false)
    private String author;

    private String genre;

    @Enumerated(EnumType.STRING)
    private Status status;
}
