package com.example.book.service;

import com.example.book.model.Book;
import com.example.book.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;

    @Autowired
    private RestTemplate restTemplate;
    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    public List<Object> getEditoriales(){
        Object[] objects = restTemplate.getForObject("http://editorialM/editorials", Object[].class);
        return Arrays.asList(objects);
    }

    /*public List<Book> getBooksByEditorial(String editorial){


        Object[] objects = restTemplate.getForObject("http://editorialM/editorials/editorial", Object[].class);
        if (editorial != null)

            return bookRepository.findByEditorialId(editorials.getId());
        else {
            return Collections.emptyList();
        }

    }*/

    public List<Book> getBookByPrice(double price){

        return bookRepository.findBooksByPriceIsLessThanEqual(price);
    }


    public Book save(Book book){
        /*Optional<Editorial> optionalEditorial = editorialRepository.findById(book.getEditorial().getId());
        book.setEditorial(optionalEditorial.get());*/
        return bookRepository.save(book);
    }

    public Book update (Book book){
        /*Book book1 = bookRepository.findById(book.getId()).get();

        if(!book.getName().isEmpty() && !book.getAuthor().isEmpty() && !book.getDescription().isEmpty()
                && book.getUrl().isEmpty() && book.getPages() > 30 && book.getPrice() > 1000) {
            book1 = book;
        }*/
        return bookRepository.save(book);
    }

    public void deleteBook (int id){
        bookRepository.deleteById(id);
    }

}
