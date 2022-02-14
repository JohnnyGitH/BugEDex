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
  bug: Observable<Bug[]>; // REMOVE ALL UNUSED THINGS PLEASE
  state:BehaviorSubject<Observable<Bug[]>> =  new BehaviorSubject<Observable<Bug[]>>(null); 
  
  // Look into standard practice behaviour subject

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


// Not sure if filter does what I think.
// Look into second filter

// Should be using a DTO model, so all API properties
// Mapping it into the domain model, setting caught property.

// Wants filtering in service.

// state property should not be exposed. Get values, through values. Like angular demo.
// private
// 