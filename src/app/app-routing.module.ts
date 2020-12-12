import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePassageComponent } from './create-passage/create-passage.component';
import { PassageListComponent } from './passage-list/passage-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/review-list', pathMatch: 'full'},
  {path: 'review-list', component: PassageListComponent },
  {path: 'create-passage', component: CreatePassageComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
