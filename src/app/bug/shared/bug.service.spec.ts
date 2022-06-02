import { createServiceFactory, SpectatorService, SpyObject } from '@ngneat/spectator'
import { BugDataService } from "./bug-data.service";
import { BugService } from './bug.service';
import * as faker from "faker";
import { Month } from "./models/month.model";
import { Bug } from "./models/bug.model";
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('BugService', () => {
  let spectator: SpectatorService<BugService>;
  let service: BugService;
  let mockDataService: SpyObject<BugDataService>;
  let data: Bug[];

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
    mockDataService = spectator.inject(BugDataService);
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  /**
   *  Testing getBugsData() method
   */
  describe('getBugsData()', () => { // NO EXPECTATION
    it("should get the bug data into the state", (done) => {
      // Arrange
      mockDataService.getBugs.and.returnValue(of(data));
      service.getBugs = true;
      spectator.service.getBugsData();
      // Act
      let actualState = spectator.service.checkBugsLoaded();
      // Assert
      expect(actualState).toBeTruthy;
      done();
    });
  })

  /**
   * Testing the checkBugCaught() method
   * // Inconsistent // Work on THIS
   */
  describe("checkBugCaught()", () => {
    data = createFakeBugArray();
    it("should find the bug", (done) => {
      // Arrange
      let index = faker.datatype.number(5);
      let expectedBug = data[index];
      // Act
      mockDataService.getBugs.and.returnValue(of(data));
      service.getBugs = true;
      service.getBugsData();
      service.checkBugCaught(expectedBug.name);
      // Assert
      service.getState().subscribe(b =>{
        b.find( bug => {
          if(bug.name === expectedBug.name){
              expect(bug.caught).toBeTruthy();
          }
        })
      })
      done();
    });
  })

  /**
   * Testing the findBug() method
   */
  describe("findBug()", () => {
    data = createFakeBugArray();
    it("should find the bug", done => {
      // Arrange
      let actualBug: Bug;
      let index = faker.datatype.number(5);
      let expectedBug = data[index];
      // Act
      mockDataService.getBugs.and.returnValue(of(data));
      service.getBugs = true;
      service.getBugsData();
      actualBug = spectator.service.findBug(expectedBug.name);
      // Assert
      expect(actualBug).toEqual(expectedBug);
      done();
    });
  })

  /**
   * Testing the getState() method
   */
  describe("getState()", () => {
    data = createFakeBugArray();
    it("should return the current value of the state", (done) => {
      // Arrange
      let actualState: Observable<Bug[]>;
      // Act
      mockDataService.getBugs.and.returnValue(of(data));
      service.getBugs = true;
      service.getBugsData();
      actualState = service.getState();
      // Assert
      expect(actualState).toBeTruthy();
      done();
    });
  })

  /**
   * Testing the checkBugsLoaded() method
   */
  describe("checkBugsLoaded()", () => {
    data = createFakeBugArray();
    it("should check if the state has value, if it does, return true", done => {
      // Arrange
      let actualState: boolean;
      // Act
      mockDataService.getBugs.and.returnValue(of(data));
      service.getBugs = true;
      service.getBugsData();
      actualState = service.checkBugsLoaded();
      // Assert
      expect(actualState).toBeTruthy();
      done();
    });
    it("should check if the state has value, if it doesn't, return false", done => {
      // Arrange
      let actualState: boolean;
      let invalidArray: Bug[];
      // Act
      mockDataService.getBugs.and.returnValue(of(invalidArray));
      service.getBugs = true;
      //service.getBugsData();
      actualState = service.checkBugsLoaded();
      // Assert
      expect(actualState).toBeFalsy();
      done();
    });
  })
});

