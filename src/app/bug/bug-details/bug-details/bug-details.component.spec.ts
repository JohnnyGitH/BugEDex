import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { BugService } from '../../shared/bug.service';
import { BugDetailsComponent } from './bug-details.component';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { ActivatedRoute, Router } from '@angular/router';

describe('BugDetailsComponent', () => {
  let spectator: Spectator<BugDetailsComponent>;
  let component: BugDetailsComponent;
  let routerMock: SpyObject<Router>;
  let bugService: SpyObject<BugService>;

  const createComponent = createComponentFactory({
      component: BugDetailsComponent,
      imports: [
          LoggerTestingModule,
          RouterTestingModule.withRoutes([{ path: '', component: BugDetailsComponent}]), // spectator
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { "": "" }
        },
      ],
      detectChanges: false,
      mocks: [
        BugService,
        Router,
       ]
    });

  beforeEach( () => {
    spectator = createComponent();
    component = spectator.component;
    routerMock = spectator.inject(Router);
    bugService = spectator.inject(BugService);
  });

  it("should create", () => {
    expect(spectator.component).toBeTruthy();
  });

  /**
   * Testing the backClick() method
   */
  describe("backClick()", () => {
    it("should navigate to the /bugs page", () => {
        // Act
        spectator.component.backClick();
        // Assert
        expect(routerMock.navigate).toHaveBeenCalledTimes(1);
        expect(routerMock.navigate).toHaveBeenCalledWith(['/bugs']);
    })
  })
});
