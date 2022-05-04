import { createServiceFactory, SpectatorService, SpyObject } from '@ngneat/spectator'
import { BugDataService } from "./bug-data.service";
import { BugService } from './bug.service';
import * as faker from "faker";
import { Month } from "./models/month.model";
import { Bug } from "./models/bug.model";
import { of } from 'rxjs';
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
  describe('getBugsData()', () => {
    it("should get the bug data into the state", done => {
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

  describe("checkBugCaught()", () => {
    data = createFakeBugArray();

    it("should find the bug", () => {
      // TODO
    });
  })

  describe("findBug()", () => { // Inconsistent
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

  describe("getState()", () => {
    data = createFakeBugArray();

    it("should return the current value of the state", () => {
      // TODO
    });
  })

  describe("checkBugsLoaded()", () => {
    data = createFakeBugArray();

    it("should check if the state has value, if it does, return true", () => {
      // TODO
    });
    it("should check if the state has value, if it doesn't, return false", () => {
      // TODO
    });
  })
});

