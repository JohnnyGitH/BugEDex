import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { BugComponent } from './bug.component';
import { BugService } from './shared/bug.service';
import { Month } from './shared/models/month.model';
import { Bug } from './shared/models/bug.model';
import { BehaviorSubject, of } from 'rxjs';

fdescribe('BugComponent', () => {
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
        name:"buterfly"+i,
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
    describe("checkBugCaught()", ()=>{
      let bugArray = [];
      //Add a single Bug to the array
      for(let i=0;i<1;i++){
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

      it("should find the bug being selected and update the caught property", () => {
        let bugName = "butterfly0";
        console.log(bugArray);
        expect(bugArray).toHaveData;
        foundBug = bugArray[0];
        console.log(foundBug);
        console.log(foundBug.name);
        console.log(foundBug.caught);

        bugService.state = new BehaviorSubject<any>(of(bugArray));

        expect(foundBug.name).toHaveText(bugName);
        expect(foundBug.caught).toBeFalsy;

        spectator.component.checkBugCaught(bugName);
        bugArray = bugService.state.getValue();
        foundBug = bugArray[0]

        expect(foundBug.caught).toBeTruthy;
      });
    })
});
