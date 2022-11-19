package com.javeriana.book.repository;

import com.javeriana.book.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;

import java.util.List;
/**
 * En esta interfaz se conecta con la base de datos para realizar operaciones.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
public interface BookRepository  extends PagingAndSortingRepository<Book, Integer>, QueryByExampleExecutor<Book> {
    /**
     * En este método se busca un libro por pagina
     * @param pageable Corresponde a la pagina del libro
     * @return User retorna los libros de una pagina
     */
    Page<Book> findAll(Pageable pageable);
    /**
     * En este método se busca un libro por editorial por id
     * @param id Corresponde al id de la editorial
     * @return User retorna los libros encontrados
     */
    List<Book> findByEditorialId(Integer id);
    /**
     * En este método se busca un libro por precio
     * @param price Corresponde al precio del libro a buscar
     * @return User retorna los libros encontrados con ese precio
     */
    List<Book> findBooksByPriceIsLessThanEqual(double price);
    /**
     * En este método se busca un libro por id
     * @param id Corresponde al id del libro a buscar
     * @return User retorna el libro encontrado.
     */
    Book findBooksById(int id);
    /**
     * En este método se busca un libro por nombre
     * @param name Corresponde al nombre del libro a buscar
     * @return User retorna los libros encontrados con ese nombre
     */
    List<Book> findBooksByNameContaining(String name);
}
