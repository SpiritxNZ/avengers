import { TestBed } from '@angular/core/testing';

import { StoreValueService } from './storevalue.service';

describe('StoreValueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreValueService = TestBed.get(StoreValueService);
    expect(service).toBeTruthy();
  });
});
