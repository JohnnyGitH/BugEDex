import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BugService } from './shared/bug.service';
import { Bug } from './shared/models/bug.model';
import { NGXLogger} from "ngx-logger";

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

  constructor(private bugService: BugService, private logger: NGXLogger, private router: Router) {}

  /**
   * When the page initializes, we want to load the bugs into the table
   * condition is if its first time, load bugs from API, otherwise
   * from local datasource
   */
  ngOnInit(): void {
    if(!this.bugService.checkBugsLoaded()){
      this.bugService.getBugsData();
    }
    this.logger.debug("ngOnInit.loadBugs()")
    this.loadBugs();
  }

  /**
   * Loading the bugs into the table data source 
   * to populate table in the template
   */
  loadBugs() {
    this.logger.debug("loadBugs(): loading Bug Service bugs")
    this.data = this.bugService.state.getValue();
    this.data.subscribe( data => {
      this.dataSource = data;
    })
    }

  /**
   * Clicking on a bug row should navigate to the details page
   * with the bug name as a param
   * @param bugName name of bug selected
   */
  bugClick(bugName: string){
    this.router.navigateByUrl("/bug?name="+bugName);// try something different. Part of the template.
  }

  /**
   * This method finds the bug being selected for
   * checkmark, and updates the caught property
   * @param bugName name of bug selected
   */
  checkBugCaught(bugName: string) {
    this.bugService.checkBugCaught(bugName);
  }
}