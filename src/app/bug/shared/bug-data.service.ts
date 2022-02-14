import { Injectable } from '@angular/core';
import { map, Observable, throwError, timeout } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Bug } from './models/bug.model';

// I will make these a config of some sort
const endpoint = "/data/v1/bug.json";
const baseUrl = "https://www.xhsun.me/acnh-api/"; // add as configuration

@Injectable({
  providedIn: 'root'
})

export class BugDataService {

  constructor(private http: HttpClient) { }

  /**
   * Accesses API, getting data
   * Need to filter the time to all day
   * Need to default the caught property to false
   * 
   * @returns Observable of Bug array
   */
  getBugs(): Observable<Bug[]> { // Implement a timeout
    console.log("GET Request for Bugs");
    return this.http
            .get<Bug[]>(baseUrl.concat(endpoint))
            .pipe(
              map( b => 
                b.filter( bug => bug.time == "All day", // Getting bugs around All day - configuration
                b.filter( bug => bug.caught = false) // Setting default to false
                )
            )
          )
  }
}

// Not sure if filter does what I think.
// Look into second filter

// Should be using a DTO model, so all API properties
// Mapping it into the domain model, setting caught property.

// Wants filtering in service.
