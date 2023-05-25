import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugComponent } from './bug.component';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';



@NgModule({
  declarations: [
    BugComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    CdkTableModule,
  ],
  providers: [],
  bootstrap:[BugComponent]
})
export class BugModule { }
