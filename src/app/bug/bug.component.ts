import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
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
  data: Observable<Bug[]>;
  persist: string;// | null;

  constructor(private bugService: BugService, private route: ActivatedRoute, private router: Router) {}

  /**
   * When the page initializes, we want to load the bugs into the table
   * condition is if its first time, load bugs from API, otherwise
   * from local datasource
   */
  ngOnInit(): void {
    this.route.queryParamMap.subscribe( params => { this.persist = params.get("state")})
    if(this.persist != "t"){ // Check if BugService state is empty.
      console.log("persist is = ", this.persist)
      this.bugService.getBugsData();// need to only do this the first time

    }
    console.log("ngOnInit.loadBugs()")
    this.loadBugs();
  }

  /**
   * Loading the bugs into the table data source 
   * to populate table in the template
   */
  loadBugs() {
    console.log("loadBugs(): loading Bug Service bugs");
    this.data = this.bugService.state.getValue();
    this.data.subscribe( data => {
      console.log(data);
      this.dataSource = data;
    })
    }

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
    this.data = this.bugService.state.getValue();
    let updated = this.data.pipe(
      map(bugs => {
        const index = bugs.findIndex( bug => bug.name == bugName);
        bugs[index].caught? bugs[index].caught = false:bugs[index].caught = true;
        return bugs;
      })
    )
    this.bugService.state.next(updated);
    
  }
}