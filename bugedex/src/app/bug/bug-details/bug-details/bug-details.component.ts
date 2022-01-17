import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { map, observable, Observable } from 'rxjs';
import { BugService } from '../../shared/bug.service';
import { Bug } from '../../shared/models/bug.model';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.css']
})
export class BugDetailsComponent implements OnInit {
  //dataSource: Bug[] = [];
  bugName: string | null;
  bugCaught: string | null;
  bug: Bug;

  constructor(private bugService: BugService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      params => {
        console.log(params);
        this.bugName = params.get("name"); 
        this.bugCaught = params.get("caught"); 
        this.bug = this.findBug(this.bugName);
        console.log(this.bug);
        console.log("bugName = "+ this.bugName+"& bugCaught = "+ this.bugCaught)
      })
      
  }

  /**
   * This method finds the bug being selected for
   * the details page
   * @param bugName name from quary params
   */
  findBug(bugName): any {
      console.log("findBug() => "+bugName);
       this.bugService.getBugs()
      .pipe(
        
        map( b =>
          b.find( b2 => b2.name === bugName))
      ).subscribe( s =>
        console.log(typeof(s),
        this.bug = s))
    }

    // I think I need a checkbox method
    // To set the checkbox on the page
    // use query param again.
}
