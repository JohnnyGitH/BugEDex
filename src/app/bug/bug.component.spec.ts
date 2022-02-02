import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { BugComponent } from './bug.component';
import { BugService } from './shared/bug.service';
import { Month } from './shared/models/month.model';
import { Bug } from './shared/models/bug.model';
import { BehaviorSubject, of } from 'rxjs';
import faker from 'faker';

describe('BugComponent', () => {
  let spectator: Spectator<BugComponent>;
  let component: BugComponent;
  let bugService: SpyObject<BugService>;
  let fakeBugs: Bug[] = [];
  let foundBug: Bug;

  const createComponent = createComponentFactory({
      component: BugComponent,
      imports:[
           RouterTestingModule.withRoutes([{ path: '', component: BugComponent }])
      ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: { name: "butterfly"}}}
        }
      ],
      detectChanges: false,
      mocks:[ BugService ]
  });

  const createFakeBugModel = (): Bug => {
    return {
      name: "butterfly",
      location: "location",
      time: "time",
      price: 1,
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
    bugService.state = new BehaviorSubject<any>([]);

  });

  it('should be createt', () => {
    expect(component).toBeTruthy();
  });

  describe("loadBugs()", () => {
    let bugArray = [];

    for(let i=0;i<10;i++){
      bugArray.push({
        name:"butterfly"+i,
        location:"location"+i,
        time:"time"+i,
        price: 10+i,
        month:{
          north:[],
          south:[]
        } as Month,
        caught:false
      } as Bug);
    }
  
    it('should load bugs into the dataSource', () =>{
      bugService.state = new BehaviorSubject<any>(of(bugArray));
      spectator.component.loadBugs();
      expect(spectator.component.dataSource).toEqual(bugArray)
    });
    })
    // Get bug array, use a name, check its caught status
    // then run checkBugCaught(), check if the bugname is updated.
    fdescribe("checkBugCaught()", ()=>{
      let bArray: Bug[] = [];
      let afterArray: Bug[] = [];
      let bug: Bug;
      bug = createFakeBugModel();
      bArray.push(bug);

      it("should find the bug being selected and update the caught property", () => {
        let bugName = bug.name;
        let foundBug: Bug;
        foundBug = { caught: false, name: "", location: "", time: "", price: 1, month: {north: [],south: [],},};
        let inputArrayBug: Bug;
        let expectedArrayBug: Bug;
        // Make sure Array has bug
        expect(bArray).toHaveData;

        inputArrayBug = bArray[0];

        //Assign caught / name
        foundBug.caught = inputArrayBug.caught;
        foundBug.name = inputArrayBug.name;

        console.log(foundBug);

        bugService.state = new BehaviorSubject<any>(of(bArray));

        expect(foundBug.name).toHaveText(bugName);
        expect(foundBug.caught).toBeFalsy;
  
        spectator.component.checkBugCaught(bugName);
        afterArray = bugService.state.getValue(); // failing here.

        console.log(afterArray);

        expectedArrayBug = afterArray[0];
        foundBug.caught = expectedArrayBug.caught

        expect(foundBug.caught).toBeTruthy;
      });
    })
});
