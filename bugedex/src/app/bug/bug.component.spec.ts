import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { BugComponent } from './bug.component';
import { BugService } from './shared/bug.service';
import faker from 'faker';
import { Month } from './shared/models/month.model';
import { Bug } from './shared/models/bug.model';
import { of } from 'rxjs';

describe('BugComponent', () => {
  let spectator: Spectator<BugComponent>;
  let component: BugComponent;
  let bugService: SpyObject<BugService>;
  let fakeBugs: Bug[] = [];


  const createComponent = createComponentFactory({
    component: BugComponent,
    providers: [
      HttpClient,
      HttpHandler,
      BugService,
      Router,
      {
        provide: ActivatedRoute,
        useValue: { snapshot:{ queryParams: { persist: "T"}}}
      }
    ],
    imports:[
      RouterTestingModule
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

  beforeEach (() => 
  {
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
