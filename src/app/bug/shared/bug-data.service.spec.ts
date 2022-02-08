import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { BugDataService } from './bug-data.service';

describe('BugDataService', () => {
  const endpoint = "/data/v1/bug.json";
  const baseUrl = "https://www.xhsun.me/acnh-api/";
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

  describe('getBugs()', () => {
    
    it('should get the bug data from the data serviceAPI', () => {
      spectator.service.getBugs().subscribe();
      
      spectator.expectOne(baseUrl.concat(endpoint), HttpMethod.GET)
    });
  })
});
