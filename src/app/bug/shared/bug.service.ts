import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BugDataService } from './bug-data.service';
import { Bug } from './models/bug.model';
import { NGXLogger} from "ngx-logger";

@Injectable({
  providedIn: 'root'
})

/**
 * This service uses the data service to get the bug data
 */
export class BugService {
  private state:BehaviorSubject<Bug[]> =  new BehaviorSubject<Bug[]>([]);
  data: Observable<Bug[]>;
  bug: Observable<Bug>;
  loaded: number;
  getBugs: boolean;

  constructor(private dataService: BugDataService,private logger: NGXLogger) { }

 /**
 * Get bugs from data service as BugDTO. Assign to behavior subject
 * Service needs to filter by All Day
 * Service needs to assign false to caught property
 */
  getBugsData() {
    this.getBugs = this.checkBugsLoaded();
    if(!this.getBugs)
    {
      this.logger.debug("Bug Service,CheckBugsLoaded is False, preparing for bug component, getBugs()");
      this.dataService.getBugs()
        .subscribe( (b) =>  {
          this.logger.debug(" bugService:getBugs B : ",b);
        this.state.next(
        b.filter( bug => bug.time == "All day")
        .map( (dto) =>
        ({
          name: dto.name,
          location: dto.location,
          time: dto.time,
          price: dto.price,
          month: dto.month,
          caught: false,
        } as Bug)
      )
      )
      }
      );
    }
    this.logger.debug("Skipped getBugs() call");
  }

 /**
 * This method finds the bug being selected for
 * checkmark, and updates the caught property
 * @param bugName name of bug selected
 */
  checkBugCaught(bugName: string) {
  this.logger.debug("checkBugCaught() bug-service  bugName: "+bugName);
  let updated = this.state.getValue();

  const index = updated.findIndex( bug => bug.name == bugName);
  updated[index].caught? updated[index].caught = false:updated[index].caught = true;

  this.state.next(updated);
 }

 /**
 * This method finds the bug  selected and
 * assigns it to the bugDetail object
 * to be displayed for the user.
 * @param bugName name of bug selected
 * @returns Observable bug value that was selected
 */
  findBug(bugName: string): Bug {
    this.logger.debug("findBugService() bug-service   bugName: "+bugName);
    let result = this.state.getValue()
                        .find(bug => bug.name === bugName)
    return    {
                          name: result.name,
                          location: result.location,
                          price: result.price,
                          month: result.month,
                          time: result.time,
                          caught: result.caught,
                        }
      }

 /**
 * Get the state and return the value
 * @returns an observable array of bugs
 */
  getState(): Observable<Bug[]> {
    return this.state.asObservable();
  }

 /**
 * This method checks the state and
 * returns a boolean. Optimize
 * @returns boolean true if state has data
 */
  checkBugsLoaded(): boolean {
    this.loaded = this.state.getValue().length;
    this.logger.debug("checkBug : Are they loaded?:"+ this.loaded);
    return this.state.getValue().length>0? true: false;
  }
}
