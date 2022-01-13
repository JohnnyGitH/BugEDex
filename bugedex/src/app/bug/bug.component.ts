import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BugService } from './shared/bug.service';
import { Bug } from './shared/models/bug.model';

/**
 * This component is responsible for displaying the bug
 * data from the api onto a table
 */
@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit {
  displayedColumns: string[] = ["name", "location", "time", "price", "monthn", "months", "caught"];

  // data for the component template table
  dataSource: Bug[] = [];
  chosenBug: Bug;

  constructor(private bugService: BugService, private router: Router) {}

  // When the page initializes, we want to load the bugs into the table
  ngOnInit(): void {
    this.loadBugs();
    console.log("After Bugs are loaded up");
  }

  /**
   * Loading the bugs into the table in the template
   */
  loadBugs() {
    this.bugService.getBugs().subscribe( bugsFromService => {
        console.log("Loading Bugs method in Bug component, loadBugs()"),
        this.dataSource = bugsFromService;
      },
    )}

    /**
     * Clicking on a bug should navigate to the details page
     * with the bug name as a param
     * @param bugName name of the selected bug
     */
    bugClick(bugName: string){
      this.router.navigateByUrl("/bug?name="+bugName);
    }

    //TODO: Method handling the checkboxes
    // Needs to handle checkmark event
    // Should update the bug.caught property
    // based on true or false
}
