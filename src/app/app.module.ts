import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BugComponent } from './bug/bug.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCommonModule } from '@angular/material/core';
import { BugDetailsComponent } from './bug/bug-details/bug-details/bug-details.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card'
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

@NgModule({
  declarations: [
    AppComponent,
    BugComponent,
    BugDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    HttpClientModule,
    MatCommonModule,
    MatCardModule,
    MatCheckboxModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
