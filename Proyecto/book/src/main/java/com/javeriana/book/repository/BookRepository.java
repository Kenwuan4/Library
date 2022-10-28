package com.javeriana.book.repository;

import com.javeriana.book.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository  extends JpaRepository<Book, Integer> {

    Page<Book> findAll(Pageable pageable);
    List<Book> findByEditorialId(Integer id);
    List<Book> findBooksByPriceIsLessThanEqual(double price);
    Book findBooksById(int id);
    List<Book> findBooksByNameContaining(String name);
}
