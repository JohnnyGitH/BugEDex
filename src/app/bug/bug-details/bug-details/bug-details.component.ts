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
   * finds it, and displays it
   */
  ngOnInit(): void {
    this.bugName = this.route.snapshot.queryParams.name;
    this.logger.debug("bugName: bug-details-component "+this.bugName);
    this.bugService.findBug(this.bugName).subscribe((data) => {
      this.bug = data
    })
  }

  /**
  * Clicking on the button navigates you
  * back to the bugs page with the list of bugs
  */
  backClick(){
    this.router.navigate(['/bugs']);
  }
}