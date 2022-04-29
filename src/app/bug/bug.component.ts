import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BugService } from './shared/bug.service';
import { Bug } from './shared/models/bug.model';
import { NGXLogger} from "ngx-logger";
import { ConfigService } from './config/config.service';

/**
 * This component is responsible for displaying the bug
 * data from the bug service onto a table
 */
@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit {
  // table columns
  displayedColumns: string[] = ["name", "location", "time", "price", "monthn", "months", "caught"];

  // data for the component template table
  dataSource: Bug[] = [];
  data: Observable<Bug[]>;

  constructor(private bugService: BugService, private logger: NGXLogger, private router: Router, private config: ConfigService) {}

  /**
   * When the page initializes, we want to load the bugs into the table
   * condition is if its first time, load bugs from API, otherwise
   * from local datasource
   */
  ngOnInit(): void {
    this.bugService.getBugsData();
    this.logger.debug("ngOnInit bug-component")
    this.loadBugs();
  }

  /**
   * Loading the bugs into the table data source
   * to populate table in the template
   */
  loadBugs() {
    this.logger.debug("loadBugs() bug-component")
    this.bugService.getState().subscribe( data => {
        this.logger.debug("Data length is :"+data.length);
        this.logger.debug("Data values is :"+data.values);
        this.dataSource = data;
      });
      this.logger.debug("Datasource :"+ this.dataSource[0]);
    }

  /**
   * Clicking on a bug row should navigate to the details page
   * with the bug name as a param
   * @param bugName name of bug selected
   */
  bugClick(bugName: string){
    this.logger.debug("bugClick() bug-component bugName: "+bugName);
    this.router.navigate(['/bug'], { queryParams:{ name: bugName }})
  }

  /**
   * This method finds the bug being selected for
   * checkmark, and updates the caught property
   * @param bugName name of bug selected
   */
  checkBugCaught(bugName: string) {
    this.logger.debug("checkBugCaught() bug-component  bugName: "+ bugName);
    this.bugService.checkBugCaught(bugName);
    this.loadBugs();
  }
}
