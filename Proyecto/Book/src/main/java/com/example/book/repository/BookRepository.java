package com.example.book.repository;

import com.example.book.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository  extends JpaRepository <Book, Integer> {

    Page<Book> findAll(Pageable pageable);
    List<Book> findByEditorialId(Integer id);
    List<Book> findBooksByPriceIsLessThanEqual(double price);
}
