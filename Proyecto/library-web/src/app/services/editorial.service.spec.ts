import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditorialService } from './editorial.service';

describe('EditorialService', () => {
  let service: EditorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EditorialService]
    });
    service = TestBed.inject(EditorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get editorials ', () => {

    spyOn(service, "getEditorials").and.returnValues
    const result = service.getEditorials()
    expect(result).not.toBeNull();
  })

  it('should get editorial by id ', () => {
    let editorial
    service.getEditorialById(1).subscribe(
      data => editorial = data
    )
    expect(editorial).not.toBeNull()
  })

  it('should get editorial by name ', () => {
    let editorial
    service.getEditorialByName("penguin").subscribe(
      data => editorial = data
    )
    expect(editorial).not.toBeNull()
  })

  it('should create a new editorial ', () => {
    let editorial
    service.postEditorial("penguin", "http:prueba", "http:prueba").subscribe(
      data => editorial = data
    )
    expect(editorial).not.toBeNull()
  })

  it('should edit editorial #19', () => {
    let editorial
    service.putEditorial(19, "penguin", "http:prueba", "http:prueba").subscribe(
      data => editorial = data
    )
    expect(editorial).not.toBeNull()
  })

  it('should delete editorial #19 ', () => {
    let editorial
    service.deleteEditorial(19).subscribe(
      data => editorial = data
    )
    expect(editorial).toBeUndefined()
  })
});
