package com.javeriana.book.service;

import com.javeriana.book.model.Book;
import com.javeriana.book.model.Editorial;
import com.javeriana.book.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
/**
 * En esta interfaz se conecta con la base de datos para realizar operaciones.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;

    @Autowired
    private RestTemplate restTemplate;
    public Page<Book> getAllBooks(Pageable pageable){

        return bookRepository.findAll(pageable);
    }

    public List<Object> getEditoriales(){
        Object[] objects = restTemplate.getForObject("http://editorialM/editorials", Object[].class);
        return Arrays.asList(objects);
    }

    public List<Book> getBooksByName(String name){
        return this.bookRepository.findBooksByNameContaining(name);
    }

    public Book getBookbyId(int id){
        return bookRepository.findBooksById(id);
    }


    public List<Book> getBooksByEditorial(String editorial){
        Editorial objects = restTemplate.getForObject("http://editorialM/editorialAPI/editorials/"+editorial, Editorial.class);

        if (objects.getId() != null)
            return this.bookRepository.findByEditorialId(objects.getId());
        else
            return Collections.emptyList();
    }

    public List<Book> getBookByPrice(double price){
        return bookRepository.findBooksByPriceIsLessThanEqual(price);
    }


    public Book save(Book book){
        return bookRepository.save(book);
    }

    public Book update (Book book){
        return bookRepository.save(book);
    }

    public void deleteBook (int id){
        bookRepository.deleteById(id);
    }

}
