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
 // let fakeBugs: Bug[] = [];

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

  beforeEach( () => {
    spectator = createComponent();
    component = spectator.component;
    bugService = spectator.inject(BugService);
    bugService.state = new BehaviorSubject<any>([])
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });  
});
