import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { HttpClientModule } from '@angular/common/http';
import { EditorialsComponent } from './editorials/editorials.component';
import { StaffComponent } from './staff/staff.component';
import { AuthComponent } from './auth/auth.component';
import { StaffInfoComponent } from './staff-info/staff-info.component';
import { BookInfoComponent } from './book-info/book-info.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    EditorialsComponent,
    StaffComponent,
    AuthComponent,
    StaffInfoComponent,
    BookInfoComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
