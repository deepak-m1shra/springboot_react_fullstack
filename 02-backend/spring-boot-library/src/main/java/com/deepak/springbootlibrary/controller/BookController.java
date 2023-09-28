package com.deepak.springbootlibrary.controller;

import com.deepak.springbootlibrary.entity.Book;
import com.deepak.springbootlibrary.service.BookService;
import com.deepak.springbootlibrary.utils.ExtractJWT;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
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
    public Book checkoutBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token);
        return bookService.checkoutBook(userEmail, bookId);
    }

    @GetMapping("secure/ischeckedout")
    public boolean isCheckedOut(@RequestHeader(value = "Authorization") String token ,@RequestParam Long bookId) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token);
        return bookService.isAlreadyWithUser(userEmail, bookId);
    }

    @GetMapping("secure/userbookscount")
    public int getUserBooksCount(@RequestHeader(value = "Authorization") String token) {
        new JwtAuthenticationToken().getToken().getSubject();
        String userEmail = ExtractJWT.payloadJWTExtraction(token);
        return bookService.getUserBooksCount(userEmail);
    }
}
