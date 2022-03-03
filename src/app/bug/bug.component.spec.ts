import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { BugComponent } from './bug.component';
import { BugService } from './shared/bug.service';
import { Month } from './shared/models/month.model';
import { Bug } from './shared/models/bug.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as faker from 'faker';

describe('BugComponent', () => {
  let spectator: Spectator<BugComponent>;
  let component: BugComponent;
  let bugService: SpyObject<BugService>;
  let routerMock: SpyObject<Router>;
  let queryName = faker.random.name();
  let testState: BehaviorSubject<Observable<Bug[]>>; //= new BehaviorSubject<Observable<Bug[]>>(null);

  const createComponent = createComponentFactory({
      component: BugComponent,
      imports:[
           RouterTestingModule.withRoutes([{ path: '', component: BugComponent }])
      ],
      providers:[
        {
          provide: ActivatedRoute, // better way
          useValue: { snapshot: { queryParams: { name: queryName}}} // spectator
        }
      ],
      detectChanges: false,
      mocks:[ 
        BugService,
        Router, 
      ]
  });

  const createFakeBugModel = (): Bug => {
    return {
      name: faker.random.word(),
      location: faker.random.word(),
      time: faker.random.word(),
      price: faker.datatype.number("min:1","max:10"), // Weird - Not sure if its working
      month:{
        north:[],
        south:[]
      } as Month,
      caught: false
    }
  }

  beforeEach (() => {
    spectator = createComponent();
    component = spectator.component;
    bugService = spectator.inject(BugService);
    testState = new BehaviorSubject<any>([]);
    routerMock = spectator.inject(Router);

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Testing the loadBugs() method
   */
  describe("loadBugs()", () => {
    let bugArray = [];

    for(let i=0;i<10;i++){
      bugArray.push({
        name:faker.random.word()+i,
        location:faker.random.word()+i,
        time:faker.random.word()+i,
        price: faker.datatype.number()+i,
        month:{
          north:[],
          south:[]
        } as Month,
        caught:false
      } as Bug);
    }
  
    it('should load bugs into the dataSource', () =>{
      testState = new BehaviorSubject<any>(of(bugArray));
      spectator.component.loadBugs();
      expect(spectator.component.dataSource).toEqual(bugArray)
    });
    })
    /**
     * Testing the checkBugCaught() method
     */
    describe("checkBugCaught()", ()=>{
      let bArray: Bug[] = [];
      let bug: Bug;
      bug = createFakeBugModel();
      bArray.push(bug);

      it("should find the bug being selected and update the caught property", () => {
        // Setup
        let bugName = bug.name;
        let foundBug: Bug;
        foundBug = { caught: false, name: "", location: "", time: "", price: 1, month: {north: [],south: [],},};
        let inputArrayBug: Bug;

        // Make sure Array has bug
        expect(bArray).toHaveData;

        // Assignment
        inputArrayBug = bArray[0];
        foundBug.caught = inputArrayBug.caught;
        foundBug.name = inputArrayBug.name;
        testState = new BehaviorSubject<any>(of(bArray));

        // Make sure foundbug name is correct and caught is false
        expect(foundBug.name).toEqual(bugName);
        expect(foundBug.caught).toBeFalsy;
  
        // Call checkBugCaught()
        spectator.component.checkBugCaught(bugName);
        let afterArray = testState.getValue();
        afterArray.subscribe( res => {
          console.log(res)
          expect(res[0].caught).toBeTruthy;
        })
      });
    })
    /**
     * Testing the bugClick() method
     */
    describe("bugClick()", () => {

      it("should navigate to the /bug page with the name of selected bug", () => {
          let bugName = queryName
          spectator.component.bugClick(bugName);

          expect(routerMock.navigate).toHaveBeenCalledTimes(1);
          expect(routerMock.navigate).toHaveBeenCalledWith("/bug?name="+queryName);
      })
    })
});
