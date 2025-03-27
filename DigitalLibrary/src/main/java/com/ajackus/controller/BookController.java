package com.ajackus.controller;

import com.ajackus.model.Book;
import com.ajackus.service.BookService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // add a book
    @PostMapping("/add")
    public Book addBook(@Valid @RequestBody Book book) {
        return this.bookService.addBook(book);
    }

    // view all books
    @GetMapping("/all")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // search by id
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    // search by title
    @GetMapping("/search")
    public Book getBookByTitle(@RequestParam String title) {
        return bookService.getBookByTitle(title);
    }

    // update book details
    @PutMapping("/update/{id}")
    public Book updateBook(@PathVariable Long id,@Valid @RequestBody Book updatedBook) {
        return bookService.updateBook(id, updatedBook);
    }

    // delete book
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return new ResponseEntity<>("Book deleted successfully", HttpStatus.OK);
    }
}
