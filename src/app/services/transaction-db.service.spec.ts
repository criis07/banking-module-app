import { TestBed } from '@angular/core/testing';

import { TransactionDBService } from './transaction-db.service';

describe('TransactionDBService', () => {
  let service: TransactionDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
