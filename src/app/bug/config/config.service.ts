import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import Config from '../../../assets/config/config.json';
import { BugAPI } from './config,model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  bugConfig: BugAPI;
  constructor(private logger: NGXLogger) { }

  /**
   * loads up and returns 
   * a bug configuration
   * 
   * @returns a bug config
   */
  loadConfiguration(): BugAPI {
    this.logger.debug(Config);
    this.bugConfig = {
      bugEndpoint: Config.bugAPI.bugEndpoint,
      bugUrl: Config.bugAPI.bugUrl
    }
    return this.bugConfig;
  }
}
