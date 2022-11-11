import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { EditorialsComponent } from './editorials/editorials.component';
import { StaffComponent } from './staff/staff.component';
import { StaffInfoComponent } from './staff-info/staff-info.component';
import { AuthComponent } from './auth/auth.component';
import { BookInfoComponent } from './book-info/book-info.component';
import { BookFormComponent } from './book-form/book-form.component';
import { EditorialFormComponent } from './editorial-form/editorial-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent, children: [{ path: 'search/:title', component: BooksComponent }] },
  { path: 'book/create', component: BookFormComponent },
  { path: 'book/edit/:id', component: BookFormComponent },
  { path: 'editorials', component: EditorialsComponent },
  { path: 'editorial/create', component: EditorialFormComponent },
  { path: 'editorial/edit/:id', component: EditorialFormComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'staff-info', component: StaffInfoComponent },
  { path: 'book-info/:id', component: BookInfoComponent },
  { path: 'login', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
