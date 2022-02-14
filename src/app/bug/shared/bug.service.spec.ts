import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  SpectatorHttp, createHttpFactory } from '@ngneat/spectator'
import { BugDataService } from "./bug-data.service";
import { BugService } from './bug.service';
import * as faker from "faker";
import { Month } from "./models/month.model";
import { Bug } from "./models/bug.model";

describe('BugService', () => {
  let spectator: SpectatorHttp<BugService>;
  let service: BugService;
  let mockDataService: BugDataService;
  let data: Bug[];

  const createService = createHttpFactory({ // Understand createHTTPFactory - not appropriate. createServiceFactor
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
    
    mockDataService = spectator.inject(BugDataService); // incorrect, Hannah says it might not work
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  /**
   *  Testing getBugsData() method
   */
  describe('getBugsData()', () => {
    
    it("should get the bug data into the state", () => {
      mockDataService.getBugs();
      spectator.service.getBugsData()

      expect(spectator.service.state).not.toBeEmpty;
    });

    it("should get bug data from API ", () => {
      spectator.inject(BugService).getBugsData.and.returnValue(data);
      spectator.service.getBugsData()
      const expect = data;

      spectator.service.getBugsData();

      const actual = spectator.service.state;
    });
  })
});


// checkbox reload
// live load
// Take a look at spectator readme - specifically for createHTTPFactories
// what kind of configuration.
// RULE OF THUMB - subscribe, sometimes async. Need the Done().
// Look into jasmine Done function
// 