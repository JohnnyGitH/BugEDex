import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { BugDTO } from './models/bug.dto.model';
import { NGXLogger} from "ngx-logger";

// I will make these a config of some sort
const endpoint = "/data/v1/bug.json";
const baseUrl = "https://www.xhsun.me/acnh-api/"; // add as configuration

@Injectable({
  providedIn: 'root'
})

export class BugDataService {

  constructor(private http: HttpClient, private logger: NGXLogger) { }

  /**
   * Accesses API, getting bug data
   * 
   * @returns Observable of Bug array
   */
  getBugs(): Observable<BugDTO[]> { // Implement a timeout
    this.logger.debug("GET Request for Bugs");
    return this.http.get<BugDTO[]>(baseUrl.concat(endpoint));
  }
}

