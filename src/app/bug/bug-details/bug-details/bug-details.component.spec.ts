import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { BugService } from '../../shared/bug.service';
import { BugDetailsComponent } from './bug-details.component';
import * as faker from 'faker';
import { Bug } from '../../shared/models/bug.model';
import { Month } from '../../shared/models/month.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('BugDetailsComponent', () => {
  let spectator: Spectator<BugDetailsComponent>;
  let component: BugDetailsComponent;
  let bugService: SpyObject<BugService>;
  let bugArray: Bug[] = [];
  let testState: BehaviorSubject<Observable<Bug[]>>;

  const createComponent = createComponentFactory({
      component: BugDetailsComponent,
      imports: [
          LoggerTestingModule,
          RouterTestingModule.withRoutes([{ path: 'bug', component: BugDetailsComponent}]) // spectator
      ],
      providers: [
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
    testState = new BehaviorSubject<any>([]);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });  
});