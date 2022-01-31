import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  SpectatorHttp, createHttpFactory } from '@ngneat/spectator'
import { BugService } from './bug.service';

describe('BugService', () => {
  let spectator: SpectatorHttp<BugService>;
  let service: BugService;

  const createService = createHttpFactory({
    service:BugService,
    imports: [HttpClientTestingModule],
    providers:[
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

  /** 
  describe('getBugsData', () => {
    it('should update the state', () => {
      expect(spectator.component.state).toBeEmpty;
    })
  })*/
});
