import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { EditorialsComponent } from './editorials/editorials.component';
import { StaffComponent } from './staff/staff.component';
import { StaffInfoComponent } from './staff-info/staff-info.component';
import { AuthComponent } from './auth/auth.component';
import { BookInfoComponent } from './book-info/book-info.component';

const routes: Routes = [
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {path: 'books', component:BooksComponent},
  {path: 'editorials', component: EditorialsComponent},
  {path: 'staff', component: StaffComponent},
  {path: 'staffInfo', component: StaffInfoComponent},
  {path: 'book-info/:id', component:BookInfoComponent},
  {path: 'login', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
