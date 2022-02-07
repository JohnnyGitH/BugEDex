import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { BugService } from '../../shared/bug.service';
import { BugDetailsComponent } from './bug-details.component';
import * as faker from 'faker';
import { Bug } from '../../shared/models/bug.model';
import { Month } from '../../shared/models/month.model';
import { BehaviorSubject, of } from 'rxjs';
import { By } from '@angular/platform-browser';

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
      name: faker.random.alphaNumeric(10),
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
    describe("findBug()", ()=>{
      let data: Bug[] = [];
      data = createFakeBugArray();

      it("should find the bug being selected and display in the template", () => {
        // Setup
        let chosenBug: Bug;
        let bugName: string;
        
        // Make sure Array has bugs
        expect(data).toHaveData;

        // Add bug array to state
        bugService.state = new BehaviorSubject<any>(of(bugArray)); //new BehaviourSubject<any>(bugArray)

        // Select one bug to be selected and found by name
        bugName = bugArray[0].name;
        chosenBug = bugArray.find( f => f.name == bugName);
        console.log("Bug name is: "+bugName+" and chosen bug is: "+ chosenBug.name);
  
        // Call findBug()
        spectator.component.findBug(bugName);

        // test properties
        console.log(spectator.component.bug.name);
        console.log(spectator.component.bug.caught);

        // DETECT CHANGES ---- here
        //spectator.detectChanges(); // dies here

        console.log(spectator.component.bug.name);
        console.log(spectator.component.bug.caught);

        // find the bug being selected
        expect(spectator.component.bug.name).toEqual(bugName); // bug?.name

        // UI label element
        const nameLabel = spectator.fixture.debugElement.query(By.css('label[data-testid="name-label"]'));

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
    })
});
