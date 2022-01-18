import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, find, map, single } from 'rxjs';
import { BugService } from './shared/bug.service';
import { Bug } from './shared/models/bug.model';

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
  chosenBug: Bug;
  caughtBug: Bug;

  constructor(private bugService: BugService, private router: Router) {}

  /**
   * When the page initializes, we want to load the bugs into the table
   * condition is if its first time, load bugs from API, otherwise
   * from local datasource
   */
  ngOnInit(): void {
    console.log("ngOnInit.loadBugs()")
    this.loadBugs();
  }

  /**
   * Loading the bugs into the localBugCollection 
   *  and datasource to populate table in the template
   */
  loadBugs() {
    console.log("loadBugs(): loading Bug Service bugs");
    this.bugService.getObservableBugs().subscribe( bugsFromService => {
        this.dataSource = bugsFromService;
        console.log("dataSource =" + bugsFromService)
      },
    )}

  /**
   * Clicking on a bug row should navigate to the details page
   * with the bug name as a param
   * @param bugName name of bug selected
   */
  bugClick(bugName: string){
    this.router.navigateByUrl("/bug?name="+bugName);
  }

  /**
   * This method finds the bug being selected for
   * checkmark, and updates the caught property
   * @param bugName name of bug selected
   */
  checkBugCaught(bugName: string) {
    console.log("bug.checkBugCaught() => "+bugName);
    // Need to find the bug based on bugName - then ternary the caught
    this.bugService.getObservableBugs().pipe(
      map(b => 
        b.find(bu => bu.name === bugName),// find selected bug
       // b.caught? b.caught = false:b.caught = true
        
    ));
    this.loadBugs();
  }
}