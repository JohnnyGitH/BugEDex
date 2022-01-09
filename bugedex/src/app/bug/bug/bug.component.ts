import { Component, OnInit } from '@angular/core';
import { Bug } from './models/bug.model';

  // Testing this piece of garbage before I get real data.
  const BUG_ARRAY: Bug[] =
    [
      { title: "0", type: "Available", description: "1" },
      { title: "1", type: "Ready",  description: "1"},
      { title: "2", type: "Started", description: "1"}
    ];

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
  displayedColumns: string[] = ["title", "type", "description"];

  // data for the component template table
  dataSource = BUG_ARRAY;

  constructor() { }

  // When the page initializes, we want to load the bugs into the table
  ngOnInit(): void {
  }
}
