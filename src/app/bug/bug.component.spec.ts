import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { BugComponent } from './bug.component';
import { BugService } from './shared/bug.service';
import { Month } from './shared/models/month.model';
import { Bug } from './shared/models/bug.model';
import { BehaviorSubject, of } from 'rxjs';

describe('BugComponent', () => {
  let spectator: Spectator<BugComponent>;
  let component: BugComponent;
  let bugService: SpyObject<BugService>;
  let routerMock: SpyObject<Router>;

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
      mocks:[ 
        BugService,
        Router, 
      ]
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

    for(let i=0;i<10;i++){ // reminder to use faker
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
        bugService.state = new BehaviorSubject<any>(of(bArray));

        // Make sure foundbug name is correct and caught is false
        expect(foundBug.name).toEqual(bugName);
        expect(foundBug.caught).toBeFalsy;
  
        // Call checkBugCaught()
        spectator.component.checkBugCaught(bugName);
        let afterArray = bugService.state.getValue();
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
          let bugName = 'butterfly'
          spectator.component.bugClick(bugName);

          expect(routerMock.navigateByUrl).toHaveBeenCalledTimes(1);
          expect(routerMock.navigateByUrl).toHaveBeenCalledWith("/bug?name="+bugName);
      })
    })
});
