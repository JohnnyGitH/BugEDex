import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BugDetailsComponent } from './bug/bug-details/bug-details/bug-details.component';
import { BugComponent } from './bug/bug.component';

const routes: Routes = [
  { path: '', component: BugComponent},
  { path: 'bugs', component: BugComponent  },
  { path: 'bug', component: BugDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
