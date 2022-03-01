import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BugService } from '../../shared/bug.service';
import { Bug } from '../../shared/models/bug.model';
import { NGXLogger} from "ngx-logger";

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.css']
})
export class BugDetailsComponent implements OnInit {
  bugName: string;
  bugCaught: string;
  bug: Bug;
  data: Observable<Bug[]>;

  constructor(private bugService: BugService, private route: ActivatedRoute, private router: Router,private logger: NGXLogger) {}

  /**
   * Gets bugName from query param
   */
  ngOnInit(): void {
    this.bugName = this.route.snapshot.queryParams.name;
    this.bugService.findBugService(this.bugName).subscribe((data) => {
      this.bug = data
    })
  }

  /**
  * Clicking on the button navigates you
  * back to the bugs page with the list of bugs
  */
  backClick(){
    //this.router.navigateByUrl("/bugs"); // Use something new! Browser saves state. If page is new page no backsies
    this.router.navigate(['/bugs']);
  }
}