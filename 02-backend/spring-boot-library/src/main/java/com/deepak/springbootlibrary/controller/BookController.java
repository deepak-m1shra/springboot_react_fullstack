package com.deepak.springbootlibrary.controller;

import com.deepak.springbootlibrary.entity.Book;
import com.deepak.springbootlibrary.service.BookService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/books")
@RestController
public class BookController {

    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PutMapping("secure/checkout")
    public Book checkoutBook(@RequestParam Long bookId) throws Exception {
        return bookService.checkoutBook("user@guser.com", bookId);
    }

    @GetMapping("secure/ischeckedout")
    public boolean isCheckedOut(@RequestParam String userEmail,@RequestParam Long bookId) {
        return bookService.isAlreadyWithUser(userEmail, bookId);
    }

    @GetMapping("secure/userbookscount")
    public int getUserBooksCount(@RequestParam String userEmail) {
        return bookService.getUserBooksCount(userEmail);
    }
}
