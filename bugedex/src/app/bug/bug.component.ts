import { Component, OnInit } from '@angular/core';
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
  displayedColumns: string[] = ["name", "location", "time", "price", "month"];

  // data for the component template table
  dataSource: Bug[] = [];

  constructor(private bugService: BugService) {}

  // When the page initializes, we want to load the bugs into the table
  ngOnInit(): void {
    this.loadBugs();
  }

  /**
   * Loading the bugs into the table in the template
   */
  loadBugs() {
    this.bugService.getBugs().subscribe({
      next: (bugs) => {
        this.dataSource = bugs.bugs;
      },
    });
  }
}
