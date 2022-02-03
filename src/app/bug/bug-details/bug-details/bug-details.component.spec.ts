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
  let bugArray: Bug[] = [];


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

  // Creating a fake bug model
  const createFakeBugModel = (): Bug => {
    return {
      name: faker.random.alphanumeric(10),// need faker to work, its not working atm.
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

  // Creating a fake bug array
  const createFakeBugArray = (): Bug[] => {
    let counter = 5;
    

    for(let i = 0; i < counter; i++){
      bugArray.push(createFakeBugModel());
    }
    return bugArray;
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
    // Get bug array, use a name
    // then run findBug()
    fdescribe("findBug()", ()=>{
      let data: Bug[] = [];
      data = createFakeBugArray();

      it("should find the bug being selected", () => {
        // Setup
        let chosenBug: Bug;
        let bugName: string;
        
        // Make sure Array has bugs
        expect(data).toHaveData;

        // Add bug array to state
        bugService.state = new BehaviorSubject<any>(of(bugArray));

        // Select one bug to be selected and found by name
        bugName = bugArray[0].name;
        chosenBug = bugArray.find( f => f.name == bugName);
        console.log("Bug name is: "+bugName+" and chosen bug is: "+ chosenBug);
  
        // Call findBug()
        spectator.component.findBug(bugName);

        expect(spectator.component.bug.name).toEqual(bugName);
      });

      /*it("should display the retrieved bug", () => {
      })*/
    })
});
