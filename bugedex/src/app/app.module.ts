import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BugComponent } from './bug/bug/bug.component';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent,
    BugComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    CdkTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }