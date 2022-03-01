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
  state:BehaviorSubject<Observable<Bug[]>> =  new BehaviorSubject<Observable<Bug[]>>(null); 
  data: Observable<Bug[]>;
  default: boolean = false; // Doesn't work in setting the value
  bug: Observable<Bug>;
  
  // Look into standard practice behaviour subject

  constructor(private dataService: BugDataService,private logger: NGXLogger) { }

 /**
 * Get bugs from data service as BugDTO. Assign to behavior subject
 * Service needs to filter by All Day
 * Service needs to assign false to caught property
 */
  getBugsData() {
    this.logger.debug("Bug Service, preparing for bug component, getBugs()");
    this.state.next(this.dataService.getBugs()
                .pipe(
                  map( b =>
                    b.filter( bug => bug.time == "All day",
                    b.map( (dto) =>
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
      )
  }

/**
 * This method finds the bug being selected for
 * checkmark, and updates the caught property
 * @param bugName name of bug selected
 */
  checkBugCaught(bugName: string) { // Fix this, need to fix check boxes
  this.logger.debug("bugName= "+bugName);
  this.data = this.state.getValue();
  let updated = this.data.pipe(
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
  findBugService(bugName: string): Observable<Bug> {
    this.logger.debug("findBugService() => "+bugName);
    this.data = this.state.getValue();
    return this.data.pipe(
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
