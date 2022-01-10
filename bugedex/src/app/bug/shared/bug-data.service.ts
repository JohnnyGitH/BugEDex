import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { BugsDTO } from './models/bugs.dto.model';

const endpoint = "/data/v1/bug.json";
const baseUrl = "https://www.xhsun.me/acnh-api/";

@Injectable({
  providedIn: 'root'
})

export class BugDataService {

  constructor(private http: HttpClient) { }

  /**
   * Accesses API, getting data
   * 
   * @returns Observable of BugDTO
   */
  getBugs(): Observable<BugsDTO> {
    console.log("GET Request for Bugs");
    return this.http
            .get<BugsDTO>(baseUrl.concat(endpoint));
  }
}
