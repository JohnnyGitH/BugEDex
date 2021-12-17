import { Component, OnInit } from '@angular/core';
import { Bug } from './models/bug.model';
import { MatTableDataSource } from '@angular/material/table'

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
  columns: string[] = ["title", "type", "description"];

  // Testing this piece of shit before I get real data.
  bugArray: Bug[] =
    [
      { title: "0", type: "Available", description: "1" },
      { title: "1", type: "Ready",  description: "1"},
      { title: "2", type: "Started", description: "1"}
    ];

  // data for the component template table
  bugTableDataSource: MatTableDataSource<Bug> = new MatTableDataSource<Bug>([]);
  constructor() { }

  // When the page initializes, we want to load the bugs into the table
  ngOnInit(): void {
    this.loadBugs();
  }

  // Method that loads the array into the data source for template table
  loadBugs(): void{
    this.bugTableDataSource.data = this.bugArray;
  }

}
