import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditorialsComponent } from './editorials/editorials.component';
import { StaffComponent } from './staff/staff.component';
import { AuthComponent } from './auth/auth.component';
import { StaffInfoComponent } from './staff-info/staff-info.component';
import { BookInfoComponent } from './book-info/book-info.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BookFormComponent } from './book-form/book-form.component';
import { HeadersInterceptor } from './headers.interceptor';
import { EditorialFormComponent } from './editorial-form/editorial-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    EditorialsComponent,
    StaffComponent,
    AuthComponent,
    StaffInfoComponent,
    BookInfoComponent,
    NavBarComponent,
    BookFormComponent,
    EditorialFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
