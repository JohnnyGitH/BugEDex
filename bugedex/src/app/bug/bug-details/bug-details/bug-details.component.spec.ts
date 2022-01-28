import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { BugService } from '../../shared/bug.service';
import { BugDetailsComponent } from './bug-details.component';
import faker from 'faker';
import { Bug } from '../../shared/models/bug.model';
import { Month } from '../../shared/models/month.model';
import { of } from 'rxjs';

describe('BugDetailsComponent', () => {
  let spectator: Spectator<BugDetailsComponent>;
  let component: BugDetailsComponent;
  let bugService: SpyObject<BugService>;
  let fakeBugs: Bug[] = [];

  const createComponent = createComponentFactory({
      component: BugDetailsComponent,
      providers: [
        HttpClient,
        HttpHandler,
        RouterTestingModule,
        BugService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: { name: "butterfly"}}}
        }
      ],
      imports:[
        RouterTestingModule,
      ],
      mocks: [BugService]
    });

    const createFakeMonthModel = (): Month => {
      const counter = faker.datatype.number({ min: 2, max: 6})
      const numArray1: number[] =[];
      const numArray2: number[] =[];

      for(let i=0; i < counter; i++){
        numArray1.push(faker.datatype.number());
        numArray2.push(faker.datatype.number());
      }
      return {
        north: numArray1,
        south: numArray2
      }
    }

    const createFakeBugModel = (): Bug => {
      const counter = faker.datatype.number({ min: 2, max: 6})
      const numArray: number[] =[];

      for(let i=0; i < counter; i++){
        numArray.push(faker.datatype.number());
      }
      
      return {
        name: faker.random.alphaNumeric(10),
        location: faker.random.alphaNumeric(10),
        time: faker.random.alphaNumeric(10),
        price: faker.datatype.number({ min: 2, max: 6}),
        month: createFakeMonthModel(),
        caught: false
      }
    }

    //Need a bug array for testing
    const createFakeBugArray = (): Bug[] => {
      const counter = faker.datatype.number({ min: 2, max: 6})
      const bugArray: Bug[] = [];

      for(let i =0; i> counter; i++){
        bugArray.push(createFakeBugModel());
      }

      return bugArray;
    }

  beforeEach( () => {
    spectator = createComponent();
    component = spectator.component;
    bugService = spectator.inject(BugService);
    fakeBugs = createFakeBugArray();
    bugService.getBugsData.and.returnValue(of(fakeBugs));
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
