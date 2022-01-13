import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { BugDataService } from './bug-data.service';
import { Bug } from './models/bug.model';

@Injectable({
  providedIn: 'root'
})

/**
 * This service uses the data service to get the bug data
 */
export class BugService {

  constructor(private dataService: BugDataService) { }

  getBugs(): Observable<Bug[]> {
    console.log("Bug Service, preparing for bug component, getBugs()");
    return this.dataService.getBugs();
  }}
