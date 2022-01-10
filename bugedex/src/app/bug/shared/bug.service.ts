import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BugDataService } from './bug-data.service';
import { Bug } from './models/bug.model';
import { Bugs } from './models/bugs.model';

@Injectable({
  providedIn: 'root'
})

/**
 * This service uses the data service to get the bug data
 */
export class BugService {

  constructor(private dataService: BugDataService) { }

  getBugs(): Observable<Bugs> {
    console.log("Bug Service, preparing for bug component");
    return this.dataService.getBugs();
  }}





/** 
                .pipe(
                  (bugdtos) => ({
                    bugdtos.map(
                      (bug) =>
                      ({
                        b
                      })
                      
                    )
                  } )
                );
  }
}

*/

/**
 *   getBugs(): Observable<Bug> {
    return this.dataService.getBugs()
                .pipe(
                  (bugdtos) => ({
                    name: bugdtos.,
                    location: bugdtos.location,
                    time: bugdtos.time,
                    price: bugdtos.price,
                    month: bugdtos.timeOfMonth,
                  } as Bug)
                );
  }
}
 * 
 * 
 */