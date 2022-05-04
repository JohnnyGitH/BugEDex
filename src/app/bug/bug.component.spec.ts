import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { BugComponent } from './bug.component';
import { BugService } from './shared/bug.service';
import { Month } from './shared/models/month.model';
import { Bug } from './shared/models/bug.model';
import { of } from 'rxjs';
import { LoggerTestingModule } from 'ngx-logger/testing';
import * as faker from 'faker';
import { BugDataService } from './shared/bug-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BugComponent', () => {
  let spectator: Spectator<BugComponent>;
  let component: BugComponent;
  let service: SpyObject<BugService>;
  let routerMock: SpyObject<Router>;
  let queryName = faker.random.word();
  let mockDataService: SpyObject<BugDataService>;
  let data: Bug[];

  const createComponent = createComponentFactory({
      component: BugComponent,
      imports:[
           RouterTestingModule.withRoutes([{ path: '', component: BugComponent }]),
           LoggerTestingModule,
           HttpClientTestingModule
      ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: { "bug?name=" :  queryName  }
        },
        HttpClientTestingModule
      ],
      detectChanges: false,
      mocks:[
        BugDataService,
        BugService,
        Router,
      ]
  });

  const createFakeBugModel = (): Bug => {
    return {
      name: faker.random.word(),
      location: faker.random.word(),
      time: "All day",
      price: faker.datatype.number("min:1","max:10"),
      month:{
        north:[],
        south:[]
      } as Month,
      caught: false
    }
  }

  const createFakeBugArray = (): Bug[] => {
    let counter = 5;
    let bugArray: Bug[] = [];
    for(let i =0;i<counter;i++){
        bugArray.push(createFakeBugModel());
    }
    return bugArray;
  }

  beforeEach (() => {
    data = createFakeBugArray();
    spectator = createComponent();
    component = spectator.component;
    const fromComponentInjector = true;
    service = spectator.inject(BugService,fromComponentInjector);
    routerMock = spectator.inject(Router);
    mockDataService = spectator.inject(BugDataService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Testing the loadBugs() method
   */
  describe("loadBugs()", () => {
    it('should load bugs from state into the dataSource', done =>{
      // Arrange
      mockDataService.getBugs.and.returnValue(of(data));
      service.getState.and.returnValue(of(data));
      service.getBugs = true;
      service.getBugsData();
      // Act
      spectator.component.loadBugs();
      // Assert
      expect(component.dataSource).not.toBeEmpty();
      done();
    });
  })



  /**
   * Testing the bugClick() method
   */
  describe("bugClick()", () => {
    it("should navigate to the /bug page with the name of selected bug", () => {
        // Arrange
        let bugName = queryName;
        // Act
        spectator.component.bugClick(bugName);
        // Assert
        expect(routerMock.navigate).toHaveBeenCalledTimes(1);
        expect(routerMock.navigate).toHaveBeenCalledWith(['/bug'], {queryParams: ({ name: queryName}) } );
    })
  })

   /**
   * Testing the checkBugCaught() method
   */
     describe("checkBugCaught()", ()=>{
      it("should find the bug being selected and update the caught property", done => {
        // Arrange
        let bugName = faker.random.word();
        // Act
        service.getState.and.returnValue(of(data));
        spectator.component.checkBugCaught(bugName);
        // Assert
        expect(service.checkBugCaught).toHaveBeenCalledTimes(1);
        expect(service.checkBugCaught).toHaveBeenCalledWith(bugName);
        done();
      });
    })
});
