import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
  private state:BehaviorSubject<Observable<Bug[]>> =  new BehaviorSubject<Observable<Bug[]>>(null); // private state
  data: Observable<Bug[]>;
  bug: Observable<Bug>;

  constructor(private dataService: BugDataService,private logger: NGXLogger) { }

 /**
 * Get bugs from data service as BugDTO. Assign to behavior subject
 * Service needs to filter by All Day
 * Service needs to assign false to caught property
 */
  getBugsData() {// consider conditional as to whether state has value CHECK BUG DATA , initialize in  naming. WITH CHECK
    if(!this.checkBugsLoaded())
    {
      this.logger.debug("Bug Service, preparing for bug component, getBugs()"); // instead of get I am loading it
    this.state.next(this.dataService.getBugs()
                .pipe(
                  map( b => b.filter( bug => bug.time == "All day")
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
            )
          ) 
    }
    // do nothing if bugs are already loaded
  }

/**
 * This method finds the bug being selected for
 * checkmark, and updates the caught property
 * @param bugName name of bug selected
 */
  checkBugCaught(bugName: string) {
  this.logger.debug("checkBugCaught() bug-service  bugName: "+bugName);
  let updated = this.state.getValue().pipe(
      map(bugs => {
      const index = bugs.findIndex( bug => bug.name == bugName);
      bugs[index].caught? bugs[index].caught = false:bugs[index].caught = true;
      return bugs;
    })
  )
  this.state.next(updated);
 }

 /**
 * This method finds the bug  selected and
 * assigns it to the bugDetail object
 * to be displayed for the user.
 * @param bugName name of bug selected
 * @returns Observable bug value that was selected
 */
  findBug(bugName: string): Observable<Bug> {
    this.logger.debug("findBugService() bug-service   bugName: "+bugName);
    return this.state.getValue().pipe(
                    map(bugs => 
                        bugs.find(bug => bug.name === bugName,
                        bugs.map( (bugDetail) =>
                        ({
                          name: bugDetail.name,
                          location: bugDetail.location,
                          price: bugDetail.price,
                          month: bugDetail.month,
                          time: bugDetail.time,
                          caught: bugDetail.caught,
                        } as Bug)
                    )
                )
          )
    )
  }

  /**
   * Get the state and return the value
   * @returns an observable array of bugs
   */
  getState(): Observable<Bug[]> {
    return this.state.getValue()
  }

 /**
 * This method checks the state and
 * returns a boolean
 * @returns boolean true if state has data
 */
  checkBugsLoaded(): boolean {
    let loaded = this.state.getValue();
    if(loaded){
      return true;
    }
    return false;
  }
}
