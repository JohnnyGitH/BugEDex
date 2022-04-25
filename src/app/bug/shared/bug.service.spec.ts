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
    data = createFakeBugArray(),
    spectator = createService(),
    service = spectator.service;
    testState = spectator.service.getState()
    mockDataService = spectator.inject(BugDataService);
  });

  it('should be created', () => { // failed
    expect(spectator.service).toBeTruthy();
  });

  /**
   *  Testing getBugsData() method
   */
  describe('getBugsData()', () => {
    it("should get the bug data into the state", () => {
      mockDataService.getBugs.and.returnValue(of(data))
      spectator.service.getBugsData()
      testState = spectator.service.getState();
      // Setup looks good but rest needs more
      // async issues, dealing Done()
      // DEMO ANGULAR - Hannah Tyler project
      // Hannahs recommendation
      // 

      expect(testState).not.toBeEmpty;
      expect(mockDataService.getBugs).toHaveBeenCalledTimes(1);
    });
  })
  
  describe("findBug()", ()=>{
    data = createFakeBugArray();

    it("should find the bug", () => {
      // Setup
      let chosenBug: Bug;
      let bugName: string;
      
      // Make sure Array has bugs
      expect(data).toHaveData;

      // Add bug array to state
      testState = new BehaviorSubject<Bug[]>(data);

      /*
      // Select one bug to be selected and found by name
      bugName = bugArray[0].name;
      chosenBug = bugArray.find( f => f.name == bugName);
      console.log("Bug name is: "+bugName+" and chosen bug is: "+ chosenBug.name);

      // Call findBug()
      data = spectator.service.findBug(bugName);

      // test properties
      console.log(spectator.service.bug.name);
      console.log(spectator.service.bug.caught);

      // DETECT CHANGES ---- here
      //spectator.detectChanges(); // dies here

      console.log(spectator.service.bug.name);
      console.log(spectator.service.bug.caught);

      // find the bug being selected
      expect(spectator.service.bug.name).toEqual(bugName); // bug?.name

      // UI label element - LOOK INTO IT
      const nameLabel = spectator.fixture.debugElement.query(By.css('label[data-testid="name-label"]')); // access native elements to access data inside the label

      // label
      console.log("NameLabel3 Querying name label: ", nameLabel.name);

      // p
      console.log("NameLabel3 Query parent name: ", nameLabel.parent.name);

      //<label _ngcontent-a-c17="" data-testid="name-label" for="name"></label>
      console.log("NameLabel3 Query actual element inner text: ", nameLabel.nativeElement.innerText);
      console.log("NameLabel3 Query actual element inner html: ", nameLabel.nativeElement.innerHTML);
      console.log("NameLabel3 Query actual element text content: ", nameLabel.nativeElement.textContents);
      console.log("NameLabel3 Query actual element outer text: ", nameLabel.nativeElement.outerText);
      console.log("NameLabel3 Query actual element label: ", nameLabel.nativeElement.label);
      console.log("NameLabel3 Query actual element text: ", nameLabel.nativeElement.text);
      console.log("NameLabel3 Query actual element: ", nameLabel.nativeElement);

      expect(nameLabel.nativeElement).toBeTruthy;*/
    });
  })
});