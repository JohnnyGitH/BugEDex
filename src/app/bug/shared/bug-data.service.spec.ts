import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator';
import { BugDataService } from './bug-data.service';

describe('BugDataService', () => {
  let spectator: SpectatorHttp<BugDataService>;
  let service: BugDataService;
  const createService = createHttpFactory({
    service: BugDataService,
    imports: [HttpClientTestingModule],
    providers: [
      HttpClient,
    ]
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
