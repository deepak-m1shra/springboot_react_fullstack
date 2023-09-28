package com.deepak.springbootlibrary.service;

import com.deepak.springbootlibrary.dao.BookRepository;
import com.deepak.springbootlibrary.dao.CheckoutRepository;
import com.deepak.springbootlibrary.entity.Book;
import com.deepak.springbootlibrary.entity.Checkout;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class BookService {

    private static final Logger logger = LoggerFactory.getLogger(BookService.class);
    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;

    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public Book checkoutBook(String userEmail, Long bookId) throws Exception {

        Optional<Book> book = bookRepository.findById(bookId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if(book.isEmpty() || validateCheckout!= null || book.get().getCopiesAvailable() <=0 ) {
            throw new Exception("Book doesn't exist or has already been checked out by the user");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() -1);
        bookRepository.save(book.get());

        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                book.get().getId()
        );

        checkoutRepository.save(checkout);

        return book.get();
    }

    public boolean isAlreadyWithUser(String userEmail, Long bookId) {
        // check if the book being requested is already issued to user
        Checkout byUserEmailAndBookId = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        logger.info("Checked out book details : {}", byUserEmailAndBookId);
        return byUserEmailAndBookId != null;
    }

    public int getUserBooksCount(String userEmail) {
        return checkoutRepository.findCheckoutByUserEmail(userEmail).size();
    }
}
