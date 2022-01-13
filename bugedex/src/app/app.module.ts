import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { BugComponent } from './bug/bug.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCommonModule } from '@angular/material/core';

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
    HttpClientModule,
    MatCommonModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
