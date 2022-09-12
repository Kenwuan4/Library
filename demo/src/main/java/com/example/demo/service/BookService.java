package com.example.demo.service;

import com.example.demo.model.Book;
import com.example.demo.model.Editorial;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.EditorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    BookRepository bookRepository;

    @Autowired
    EditorialRepository editorialRepository;

    public List<Book> getAllBooks(){
        List<Book> books = new ArrayList<Book>();
        bookRepository.findAll().forEach(book -> books.add(book));
        return books;
    }

    public Book save(Book book){
        Optional<Editorial> optionalEditorial = editorialRepository.findById(book.getEditorial().getId());
        book.setEditorial(optionalEditorial.get());
        return bookRepository.save(book);
    }

    public Book update (Book book){
        Book book1 = bookRepository.findById(book.getId()).get();

        if(!book.getName().isEmpty() && !book.getAuthor().isEmpty() && !book.getDescription().isEmpty()){
            book1.setName(book.getName());
            book1.setAuthor(book.getAuthor());
            book1.setDescription(book.getDescription());

        }
        return bookRepository.save(book1);
    }
    public void deleteBook (int id){
        bookRepository.deleteById(id);
    }




}
