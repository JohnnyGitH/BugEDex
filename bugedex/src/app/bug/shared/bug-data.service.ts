import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Bug } from './models/bug.model';

// I would make these a config of some sort
const endpoint = "/data/v1/bug.json";
const baseUrl = "https://www.xhsun.me/acnh-api/";

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
   * @returns Observable of BugDTO
   */
  getBugs(): Observable<Bug[]> {
    console.log("GET Request for Bugs");
    return this.http
            .get<Bug[]>(baseUrl.concat(endpoint))
            .pipe(
              map( b => 
                b.filter( bug => bug.time = "All day",
                b.filter( bug => bug.caught = false) // Setting default to false
                )
            )// map
          )// pipe
  }
}