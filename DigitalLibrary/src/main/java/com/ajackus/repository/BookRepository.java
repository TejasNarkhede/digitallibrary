package com.ajackus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ajackus.model.Book;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // query creation from method names
    Optional<Book> findByTitle(String title);
}

// JPA performes all crud opertions on the database automatically