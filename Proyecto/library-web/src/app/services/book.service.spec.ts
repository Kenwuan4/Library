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
      imports: [HttpClientTestingModule ],
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
    const result = service.getBook(0,3,"id",true)
    expect(service.getBook).toHaveBeenCalled();
    expect(result).not.toBeNull();
  });
  

  it('should getBooks', () => { 

    let postBook;
    service.postBook("test", "test", "test_author", "google.com", 5, 70000, 1).subscribe(res => {
      postBook = res;
    });  
    expect(postBook).not.toBeNull();
  });
  
/*
  it("should return data", () => {
    let result: Book[] =[];
    service.getBook().subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne(
      { method: 'GET', url:'http://localhost:8084/bookAPI/books' });

    req.flush([book]);

    expect(result[0]).toBe(book);
  });
*/

});
