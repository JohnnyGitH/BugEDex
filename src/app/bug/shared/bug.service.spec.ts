import { createServiceFactory, SpectatorService, SpyObject } from '@ngneat/spectator'
import { BugDataService } from "./bug-data.service";
import { BugService } from './bug.service';
import * as faker from "faker";
import { Month } from "./models/month.model";
import { Bug } from "./models/bug.model";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('BugService', () => {
  let spectator: SpectatorService<BugService>;
  let service: BugService;
  let mockDataService: SpyObject<BugDataService>;
  let data: Bug[];
  let testState: Observable<Bug[]>;

  // Understand createHTTPFactory - not appropriate. createServiceFactor
  //const createService = createServiceFactory(BugService);
  const createService = createServiceFactory({
    service: BugService,
    imports: [HttpClientTestingModule,LoggerTestingModule],
    mocks: [BugDataService],
  });

  const createFakeBugModel = (): Bug => {
    let bug = {
      name: faker.random.word(),
      location: faker.random.word(),
      time: "All day",
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
    data = createFakeBugArray(),
    spectator = createService(),
    service = spectator.service;
    testState = spectator.service.getState();
    mockDataService = spectator.inject(BugDataService);
  });

  it('should be created', () => { // failed
    expect(spectator.service).toBeTruthy();
  });

  /**
   *  Testing getBugsData() method
   */
  describe('getBugsData()', () => {
    it("should get the bug data into the state", done => {
      mockDataService.getBugs.and.returnValue(of(data));
      spectator.service.getBugsData();
      testState = spectator.service.getState();

      expect(testState).not.toBeEmpty;
      expect(mockDataService.getBugs).toHaveBeenCalledTimes(1);
      done();
    });
  })

  describe("findBug()", () => {
    data = createFakeBugArray();

    it("should find the bug", () => {
      // Setup
      let actualBug: Bug;

      let index = faker.datatype.number(5);
      let expectedBug = data[index];

      mockDataService.getBugs.and.returnValue(of(data));
      service.getBugs = true;
      service.getBugsData();
      actualBug = spectator.service.findBug(expectedBug.name);

      expect(actualBug).toEqual(expectedBug);
    });
  })
});
// when stable, or spy on state property of service.
// JS way, I can access the property even private. Service to Anytype.
// Set the state property to any.
// new. or return observable, completes when update state
// spectator fixture when stable
