import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatMenuModule } from '@angular/material'
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon"; // <----- Here
import {DropdownModule} from "ngx-dropdown";
import { AppComponent } from './app.component';
import { TasksComponent } from './task/tasks.component'
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,

    MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatMenuModule, 
    MatAutocompleteModule,

    DropdownModule, // <--- HERE
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
