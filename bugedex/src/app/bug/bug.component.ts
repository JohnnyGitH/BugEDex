import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
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
  localBugCollection: Bug[] = [];
  dataSource: Bug[] = [];
  chosenBug: Bug;
  //caughtBug: Bug;

  constructor(private bugService: BugService, private router: Router) {}

  /**
   * When the page initializes, we want to load the bugs into the table
   * condition is if its first time, load bugs from API, otherwise
   * from local datasource
   */
  ngOnInit(): void {
    if(this.localBugCollection.length == 0){
      console.log("ngOnInit.loadBugs()")
      this.loadBugs();
    }
    this.localBugsToDataSource();
    console.log("ngOnInit");
  }

  /**
   * Loads local datasource for the table
   */
  localBugsToDataSource(): void {
    this.dataSource = this.localBugCollection;
  }

  /**
   * Loading the bugs into the localBugCollection 
   *  and datasource to populate table in the template
   */
  loadBugs() {
    this.bugService.getBugs().subscribe( bugsFromService => {
        console.log("loadBugs()"),
        this.localBugCollection = bugsFromService;
        this.dataSource = bugsFromService;
      },
    )}

  /**
   *   
   * Clicking on a bug row should navigate to the details page
   * with the bug name as a param
   * @param bugName name of bug selected
   * @param caught caught status T or F
   */
  bugClick(bugName: string, caught: boolean){
    this.router.navigateByUrl("/bug?name="+bugName+"&caught="+caught);
  }

  /**
   * This method finds the bug being selected for
   * checkmark, and updates the caught property
   * @param bugName name of bug selected
   */
  checkBugCaught(bugName: string) {
    console.log("bug.checkBugCaught() => "+bugName);
     this.bugService.getBugs()
    .pipe(
      map( b =>
        b.find( b2 => b2.name === bugName))
    ).subscribe( s =>
      s.caught? s.caught = true: s.caught = false
      )
    }
}
