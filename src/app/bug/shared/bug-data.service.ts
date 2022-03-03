import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { BugDTO } from './models/bug.dto.model';
import { NGXLogger} from "ngx-logger";
import { ConfigService } from '../config/config.service';
import { BugAPI } from '../config/config,model';

@Injectable({
  providedIn: 'root'
})

export class BugDataService {
  config: BugAPI;

  constructor(private http: HttpClient, private logger: NGXLogger, private bugConfig: ConfigService) {
    this.config = bugConfig.loadConfiguration();
   }

  /**
   * Accesses API, getting bug data
   * Implement a timeout
   * @returns Observable of Bug array
   */
  getBugs(): Observable<BugDTO[]> {
    this.logger.debug("BaseUrl: "+this.config.bugUrl+" bug endpoint:"+this.config.bugEndpoint)
    return this.http.get<BugDTO[]>(this.config.bugUrl.concat(this.config.bugEndpoint));
  }
}

