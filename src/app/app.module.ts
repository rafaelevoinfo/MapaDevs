import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { DevFormComponent } from './dev-form/dev-form.component';
import { HttpClientModule } from '@angular/common/http';
import { DevItemComponent } from './dev-item/dev-item.component';
import { RouterModule } from '@angular/router';
import {ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    DevFormComponent,
    DevItemComponent    
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,     
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
