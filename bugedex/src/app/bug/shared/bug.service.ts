import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, single } from 'rxjs';
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
  state:BehaviorSubject<any> =  new BehaviorSubject<any>([]);

  constructor(private dataService: BugDataService) { }

  /**
   * Get bugs from data service. Assign to local variable
   */
  getBugsData() {
    console.log("Bug Service, preparing for bug component, getBugs()");
    this.state.next(this.dataService.getBugs());    
    console.log("Value - ",this.state.value)        
  }
}