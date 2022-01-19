import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { map, observable, Observable } from 'rxjs';
import { BugService } from '../../shared/bug.service';
import { Bug } from '../../shared/models/bug.model';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.css']
})
export class BugDetailsComponent implements OnInit {
  bugName: string | null;
  bugCaught: string | null;
  bug: Bug;
  data: Observable<Bug[]>;

  constructor(private bugService: BugService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      params => {
        console.log(params);
        this.bugName = params.get("name"); 
        this.findBug(this.bugName)
        console.log("bugName = "+ this.bugName+"& bugCaught = "+ this.bugCaught)
      })
  }

  /**
 * Clicking on a bug row should navigate to the details page
 * with the bug name as a param
 * @param bugName name of bug selected
 */
  backClick(){
    this.router.navigateByUrl("/bugs?state=t");
  }

  /**
   * This method finds the bug being selected for
   * checkmark, and updates the caught property
   * @param bugName name of bug selected
   */
  findBug(bugName: string) {
    console.log("findBug() => "+bugName);
    this.data = this.bugService.state.getValue();
    this.data.pipe(
      map(bugs => 
        bugs.find(bug => bug.name === bugName))
    ).subscribe(bugDetail => this.bug = bugDetail)
    //this.bugService.state.next(updated);
  }
}
