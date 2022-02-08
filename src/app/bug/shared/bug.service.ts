import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BugDataService } from './bug-data.service';
import { Bug } from './models/bug.model';

@Injectable({
  providedIn: 'root'
})

/**
 * This service uses the data service to get the bug data
 */
export class BugService {
  bug: Observable<Bug[]>;
  state:BehaviorSubject<Observable<Bug[]>> =  new BehaviorSubject<Observable<Bug[]>>(null); // update type Bug[]

  constructor(private dataService: BugDataService) { }

  /**
   * Get bugs from data service. Assign to behavior subject
   */
  getBugsData() {
    console.log("Bug Service, preparing for bug component, getBugs()");
    this.state.next(this.dataService.getBugs()); 
    console.log("Value - ",this.state.value)        
  }
}