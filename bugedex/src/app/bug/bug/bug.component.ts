import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatButtonModule } from '@angular/material'
import { Bug } from './models/bug.model';
import { MatTableDataSource } from '@angular/material'


@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit {
  columns: string[] = ["title", "type", "description"];

  // Testing this piece of shit before I get real data.
  bugArray: Bug[] =
    [{ "title": "0", "type": "Available", "description": "1" },
    { "title": "1", "type": "Ready",  "description": "1"},
    { "title": "2", "type": "Started", "description": "1"}
];

  bugTableDataSource: MatTableDataSource<Bug> = new MatTableDataSource<Bug>([]);
  constructor() { }

  ngOnInit(): void {
    this.bugTableDataSource.data = this.bugArray;
  }

}
