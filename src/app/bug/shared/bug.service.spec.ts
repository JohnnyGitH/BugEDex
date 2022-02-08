import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  SpectatorHttp, createHttpFactory } from '@ngneat/spectator'
import { BugDataService } from './bug-data.service';
import { BugService } from './bug.service';
import * as faker from 'faker';
import { Month } from './models/month.model';
import { Bug } from './models/bug.model';

describe('BugService', () => {
  let spectator: SpectatorHttp<BugService>;
  let service: BugService;
  let mockDataService: BugDataService;
  let data: Bug[];

  const createService = createHttpFactory({
    service:BugService,
    imports: [HttpClientTestingModule],
    providers:[
      HttpClient,
    ]
  });

  const createFakeBugModel = (): Bug => {
    let bug = {
      name: faker.random.word(),
      location: faker.random.word(),
      time: faker.random.word(),
      price: faker.datatype.number(5),
      month:{
        north: [],
        south: []
      } as Month,
      caught:false
    } as Bug;
    return bug;
  }

  const createFakeBugArray = (): Bug[] => {
    let counter = 5;
    let bugArray: Bug[] = [];
    for(let i =0;i<counter;i++){
        bugArray.push(createFakeBugModel());
    }
    return bugArray;
  }
  
  
  beforeEach(() => {
    data = createFakeBugArray();
    spectator = createService();
    service = spectator.service;
    
    mockDataService = spectator.inject(BugDataService);
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('getBugsData', () => {
    
    it("should get the bug data from the data service", () => {
      mockDataService.getBugs();
      spectator.service.getBugsData()

      expect(spectator.service.state).not.toBeEmpty;
    });
  })
});
