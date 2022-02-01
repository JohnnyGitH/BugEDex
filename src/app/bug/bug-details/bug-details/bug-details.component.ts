import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BugService } from '../../shared/bug.service';
import { Bug } from '../../shared/models/bug.model';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.css']
})
export class BugDetailsComponent implements OnInit {
  bugName: string; //| //null;
  bugCaught: string; //| null;
  bug: Bug;
  data: Observable<Bug[]>;

  constructor(private bugService: BugService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.bugName = this.route.snapshot.queryParams.name;
    this.findBug(this.bugName)
    console.log("bugName = "+ this.bugName+"& bugCaught = "+ this.bugCaught)
    /** 
    this.route.queryParamMap.subscribe(
      params => {
        console.log(params);
        this.bugName = params.get("name"); 
        this.findBug(this.bugName)
        console.log("bugName = "+ this.bugName+"& bugCaught = "+ this.bugCaught)
      })*/
  }

  /**
 * Clicking on the button should navigate you
 * back to the bugs page with the list of bugs
 */
  backClick(){
    this.router.navigateByUrl("/bugs?state=t");
  }

  /**
   * This method finds the bug  selected and
   * assigns it to the bugDetail object
   * to be displayed for the user.
   * @param bugName name of bug selected
   */
  findBug(bugName: string) {
    console.log("findBug() => "+bugName);
    this.data = this.bugService.state.getValue();
    this.data.pipe(
      map(bugs => 
        bugs.find(bug => bug.name === bugName))
    ).subscribe(bugDetail => this.bug = bugDetail)
  }
}
