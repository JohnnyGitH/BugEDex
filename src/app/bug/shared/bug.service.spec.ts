import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  SpectatorHttp, createHttpFactory } from '@ngneat/spectator'
import { BugDataService } from "./bug-data.service";
import { BugService } from './bug.service';
import * as faker from "faker";
import { Month } from "./models/month.model";
import { Bug } from "./models/bug.model";
import { Observable } from 'rxjs';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('BugService', () => {
  let spectator: SpectatorHttp<BugService>;
  let service: BugService;
  let mockDataService: BugDataService;
  let data: Bug[];
  let testState: Observable<Bug[]>;

  const createService = createHttpFactory({ // Understand createHTTPFactory - not appropriate. createServiceFactor
    service:BugService,
    imports: [
      HttpClientTestingModule,
      LoggerTestingModule],
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
    testState =spectator.service.getState()
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
      testState = spectator.service.getState();

      expect(testState).not.toBeEmpty;
    });
    /*
    it("should get bug data from API ", () => {
      spectator.inject(BugService).getBugsData.and.returnValue(data);
      spectator.service.getBugsData()
      const expect = data;

      spectator.service.getBugsData();
      testState = spectator.service.getState();

      const actual = testState;
      //expect(expect).toEqual(actual);
    });*/
  })
 /* describe("findBug()", ()=>{
    let data: Bug[] = [];
    data = createFakeBugArray();

    it("should find the bug being selected and display in the template", () => {
      // Setup
      let chosenBug: Bug;
      let bugName: string;
      
      // Make sure Array has bugs
      expect(data).toHaveData;

      // Add bug array to state
      testState = new BehaviorSubject<any>(of(bugArray));

      // Select one bug to be selected and found by name
      bugName = bugArray[0].name;
      chosenBug = bugArray.find( f => f.name == bugName);
      console.log("Bug name is: "+bugName+" and chosen bug is: "+ chosenBug.name);

      // Call findBug()
      data = spectator.bugService.findBug(bugName);

      // test properties
      console.log(spectator.component.bug.name);
      console.log(spectator.component.bug.caught);

      // DETECT CHANGES ---- here
      //spectator.detectChanges(); // dies here

      console.log(spectator.component.bug.name);
      console.log(spectator.component.bug.caught);

      // find the bug being selected
      expect(spectator.component.bug.name).toEqual(bugName); // bug?.name

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

      expect(nameLabel.nativeElement).toBeTruthy;
    });
  })*/
});