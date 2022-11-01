import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EncryptService } from './encrypt.service';

describe('EncryptService', () => {
  let service: EncryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
      providers: [EncryptService]
    });
    service = TestBed.inject(EncryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
