package com.example.demo.service;

import com.example.demo.model.Book;
import com.example.demo.model.Editorial;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.EditorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    BookRepository bookRepository;

    @Autowired
    EditorialRepository editorialRepository;

    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    public List<Book> getBooksByEditorial(String editorial){
        Editorial editorials = editorialRepository.findEditorialByName(editorial);
        if (editorials != null)
            return bookRepository.findByEditorialId(editorials.getId());
        else {
            return Collections.emptyList();
        }

    }

    public List<Book> getBookByPrice(double price){

        return bookRepository.findBooksByPriceIsLessThanEqual(price);
    }


    public Book save(Book book){
        Optional<Editorial> optionalEditorial = editorialRepository.findById(book.getEditorial().getId());
        book.setEditorial(optionalEditorial.get());
        return bookRepository.save(book);
    }

    public Book update (Book book){
        Book book1 = bookRepository.findById(book.getId()).get();

        if(!book.getName().isEmpty() && !book.getAuthor().isEmpty() && !book.getDescription().isEmpty()
        && book.getUrl().isEmpty() && book.getPages() > 30 && book.getPrice() > 1000) {
            book1 = book;
        }
        return bookRepository.save(book1);
    }
    public void deleteBook (int id){
        bookRepository.deleteById(id);
    }




}
