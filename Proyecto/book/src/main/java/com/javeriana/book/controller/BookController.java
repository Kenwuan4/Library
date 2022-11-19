package com.javeriana.book.controller;

import com.javeriana.book.model.Book;
import com.javeriana.book.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
/**
 * En este cotrolador se exponen los metodos HTTP.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@RestController
@RequestMapping("/bookAPI")
@CrossOrigin("http://localhost:4200/")
public class BookController {

    @Autowired
    BookService bookService;

    /**
     * En este método HTTP GET se extraen todos los libros de forma paginada.
     * @return User retorna la coleccion de libros.
     */

    @GetMapping("/books")
    private ResponseEntity<Page<Book>> getAllBooks(@RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "10") int size,
                                                   @RequestParam(defaultValue = "id") String order,
                                                   @RequestParam(defaultValue = "true") boolean asc){
        Page<Book> books = bookService.getAllBooks(PageRequest.of(page,size, Sort.by(order)));
        return new ResponseEntity<Page<Book>>(books, HttpStatus.OK);
    }

    /**
     * En este método HTTP GET se busca un libro por id
     * @param id Corresponde al id del libro a buscar
     * @return User retorna el libro encontrado
     */

    @GetMapping("/books/{id}")
    private Book getBookbyId(@PathVariable("id") int id ){
        return bookService.getBookbyId(id);
    }

    /**
     * En este método HTTP GET se busca las editoriales por nombre
     * @param editorial Corresponde al nombre de la editorial a buscar.
     * @return User retorna la editorial encontrada.
     */

    @GetMapping("/books/editorials/{name}")
    private List<Book> getBooksByEditorial(@PathVariable("name") String editorial){
        return bookService.getBooksByEditorial(editorial);
    }

    /**
     * En este método HTTP GET se busca todas las editoriales
     * @return User retorna las editoriales encontradas.
     */

    @GetMapping("/books/editorials")
    private List<Object> getEditoriales(){
        return bookService.getEditoriales();
    }

    /**
     * En este método HTTP GET se busca un libro por nombre
     * @param name Corresponde al nombre del libro a buscar
     * @return User retorna el libro encontrado.
     */
    @GetMapping("/books/search/{name}")
    private List<Book> getBooksByName(@PathVariable("name") String name){
        return bookService.getBooksByName(name);
    }

    /**
     * En este método HTTP GET se busca un libro por precio
     * @param price Corresponde al precio del libro a buscar
     * @return User retorna el libro encontrado.
     */
    @GetMapping("/books/price/{price}")
    private List<Book> getBooksByPrice (@PathVariable("price") double price){
        return bookService.getBookByPrice(price);
    }


    /**
     * En este método HTTP DELETE se elimina un libro por id
     * @param id Corresponde al id del libro a eliminar.
     * @return User retorna el libro eliminado.
     */

    @DeleteMapping("/book/{bookid}")
    private ResponseEntity deleteBook(@PathVariable("bookid") int id){
        bookService.deleteBook(id);
        return ResponseEntity.ok().build();
    }

    /**
     * En este método HTTP POST se guarda un libro
     * @param books Corresponde al libro a guardar.
     * @param response Corresponde a la respuesta si el libro se pudo guardar.
     * @return User retorna el libro guardado.
     */

    @PostMapping("/book")
    @CrossOrigin("http://localhost:4200/")
    @ResponseBody
    private Book saveBook(@RequestBody Book books, HttpServletResponse response)
    {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        return bookService.save(books);
    }

    /**
     * En este método HTTP PUT se actualiza un libro
     * @param books Corresponde al libro a actulizar.
     * @param response Corresponde a la respuesta si el libro se pudo actualizar.
     * @return User retorna el libro actualizado.
     */

    @PutMapping("/update/book")

    private Book updateBook(@RequestBody Book books, HttpServletResponse response)
    {

        return bookService.update(books);
    }

}