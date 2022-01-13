import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { BugsDTO } from './models/bugs.dto.model';
import { Bug } from './models/bug.model';

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
   * 
   * @returns Observable of BugDTO
   */
  getBugs(): Observable<Bug[]> {
    console.log("GET Request for Bugs");
    return this.http
            .get<Bug[]>(baseUrl.concat(endpoint))
            .pipe(
              map( b =>
               b.filter( bug => bug.time = "All day") // Requested filter
            ))
  }
}
