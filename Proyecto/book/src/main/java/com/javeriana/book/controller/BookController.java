package com.javeriana.book.controller;

import com.javeriana.book.model.Book;
import com.javeriana.book.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/bookAPI")
@CrossOrigin("http://localhost:4200/")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping("/books")
    private List<Book> getAllBooks(){
        return bookService.getAllBooks();
    }

    @GetMapping("/books/{id}")
    private Book getBookbyId(@PathVariable("id") int id ){
        return bookService.getBookbyId(id);
    }

    @GetMapping("/books/editorials/{name}")
    private List<Book> getBooksByEditorial(@PathVariable("name") String editorial){
        return bookService.getBooksByEditorial(editorial);
    }

    @GetMapping("/books/editorials")
    private List<Object> getEditoriales(){
        return bookService.getEditoriales();
    }

    @GetMapping("/books/search/{name}")
    private List<Book> getBooksByName(@PathVariable("name") String name){
        return bookService.getBooksByName(name);
    }

    @GetMapping("/books/price/{price}")
    private List<Book> getBooksByPrice (@PathVariable("price") double price){
        return bookService.getBookByPrice(price);
    }

    @DeleteMapping("/book/{bookid}")
    private ResponseEntity deleteBook(@PathVariable("bookid") int id){
        bookService.deleteBook(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/book")
    @CrossOrigin("http://localhost:4200/")
    @ResponseBody
    private Book saveBook(@RequestBody Book books, HttpServletResponse response)
    {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        return bookService.save(books);
    }

    @PutMapping("/update/book")

    private Book updateBook(@RequestBody Book books, HttpServletResponse response)
    {

        return bookService.update(books);
    }

}