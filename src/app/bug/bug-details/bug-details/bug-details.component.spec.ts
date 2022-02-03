import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { BugService } from '../../shared/bug.service';
import { BugDetailsComponent } from './bug-details.component';
import faker from 'faker';
import { Bug } from '../../shared/models/bug.model';
import { Month } from '../../shared/models/month.model';
import { BehaviorSubject, of } from 'rxjs';

describe('BugDetailsComponent', () => {
  let spectator: Spectator<BugDetailsComponent>;
  let component: BugDetailsComponent;
  let bugService: SpyObject<BugService>;
 //let fakeBugs: Bug[] = [];

  const createComponent = createComponentFactory({
      component: BugDetailsComponent,
      imports: [
          RouterTestingModule.withRoutes([{ path: 'bug', component: BugDetailsComponent}])
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: { name: "T"}}}
        }
      ],
      detectChanges: false,
      mocks: [ BugService ]
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

  beforeEach( () => {
    spectator = createComponent();
    component = spectator.component;
    bugService = spectator.inject(BugService);
    bugService.state = new BehaviorSubject<any>([])
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });  
    // Get bug array, use a name, check its caught status
    // then run checkBugCaught(), check if the bugname is updated.
    describe("findBug()", ()=>{
      let bArray: Bug[] = [];
      let bug: Bug;
      bug = createFakeBugModel();
      bArray.push(bug);

      it("should find the bug being selected", () => {
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
        bugService.state = new BehaviorSubject<any>(of(bArray));

        // Make sure foundbug name is correct and caught is false
        expect(foundBug.name).toEqual(bugName);
        expect(foundBug.caught).toBeFalsy;
  
        // Call checkBugCaught()
        //spectator.component.checkBugCaught(bugName);
        let afterArray = bugService.state.getValue(); // failing here.
        afterArray.subscribe( res => {
          console.log(res)
          expect(res[0].caught).toBeTruthy;
        })
      });

      it("should display the retrieved bug", () => {
        //setup


        
      })
    })
});
