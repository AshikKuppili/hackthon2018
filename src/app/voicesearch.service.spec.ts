import { TestBed, inject } from '@angular/core/testing';

import { VoicesearchService } from './voicesearch.service';

describe('VoicesearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoicesearchService]
    });
  });

  it('should be created', inject([VoicesearchService], (service: VoicesearchService) => {
    expect(service).toBeTruthy();
  }));
});
