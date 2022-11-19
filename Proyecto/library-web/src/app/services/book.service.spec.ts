import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Book } from '../models/Book';

describe('BookService', () => {
  let service: BookService;
  let httpTestingController: HttpTestingController;
  let baseUrl = "/bookAPI/books";
  let book: Book;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });
    service = TestBed.inject(BookService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should invoke http method and return data when getData method is called', () => {
    // returned value in order to avoid actual http call
    spyOn(service, "getBook").and.returnValues
    const result = service.getBook(0, 3, "id", true)
    expect(service.getBook).toHaveBeenCalled();
    expect(result).not.toBeNull();
  });

  it('should get all books', () => {

    let postBook;
    service.getBook(0, 3, "id", true).subscribe(res => {
      postBook = res;
    });
    expect(postBook).not.toBeNull();
  });

  it('should create a new book', () => {

    let postBook;
    service.postBook("test", "test", "test_author", "google.com", 5, 70000, 1).subscribe(res => {
      postBook = res;
    });
    expect(postBook).not.toBeNull();
  });

  it('should get a book by its title', () => {

    let postBook;
    service.getBookByTitle("cien").subscribe(res => {
      postBook = res;
    });
    expect(postBook).not.toBeNull();
  });

  it('should get a books by editorial', () => {

    let postBook;
    service.getBooksByEditorial("penguin").subscribe(res => {
      postBook = res;
    });
    expect(postBook).not.toBeNull();
  });

  it('should get a book by id', () => {

    let postBook;
    service.getBookById(1).subscribe(res => {
      postBook = res;
    });
    expect(postBook).not.toBeNull();
  });

  it('should delete a book by id', () => {

    let postBook;
    service.deleteBook(1).subscribe(res => {
      postBook = res;
    });
    expect(postBook).toBeUndefined();
  });

  it('should update a book', () => {

    let postBook;
    service.putBook(1, "test", "test", "test_author", "google.com", 5, 70000, 1).subscribe(res => {
      postBook = res;
    });
    expect(postBook).not.toBeNull();
  });
});
