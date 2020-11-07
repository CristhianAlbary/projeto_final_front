import { TestBed } from '@angular/core/testing';

import { WebsocketGuardService } from './websocket-guard.service';

describe('WebsocketGuardService', () => {
  let service: WebsocketGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
