package com.example.demo.controller;


import com.example.demo.model.Book;
import com.example.demo.service.BookService;
import com.example.demo.service.EditorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:8080")
@RestController
public class BookController {
    @Autowired
    BookService bookService;



    @GetMapping("/books")
    private List<Book> getAllBooks(){
        return bookService.getAllBooks();
    }

    @DeleteMapping("/book/{bookid}")
    private void deleteBook(@PathVariable("bookid") int id){
        bookService.deleteBook(id);
    }

    @PostMapping("/book")
    private Book saveBook(@RequestBody Book books)
    {
        return bookService.save(books);
    }

    @PutMapping("/book")
    private Book updateBook(@RequestBody Book books)
    {
        return bookService.update(books);
    }
}
