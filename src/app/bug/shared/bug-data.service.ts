import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { BugDTO } from './models/bug.dto.model';
import { NGXLogger} from "ngx-logger";
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})

export class BugDataService {

  constructor(private http: HttpClient, private logger: NGXLogger, private bugConfig: ConfigService) { }

  /**
   * Accesses API, getting bug data
   * Implement a timeout
   * @returns Observable of Bug array
   */
  getBugs(): Observable<BugDTO[]> {
    let config = this.bugConfig.loadConfiguration();
    this.logger.debug("BaseUrl: "+config.bugUrl+" bug endpoint:"+config.bugEndpoint)
    return this.http.get<BugDTO[]>(config.bugUrl.concat(config.bugEndpoint));
  }
}

