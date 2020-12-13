import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PassageListComponent } from './passage-list/passage-list.component';
import { PassageItemComponent } from './passage-item/passage-item.component';
import { CreatePassageComponent } from './create-passage/create-passage.component';
import { PassageComponent } from './passage/passage.component';
import { EditPassageComponent } from './edit-passage/edit-passage.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PassageListComponent,
    PassageItemComponent,
    CreatePassageComponent,
    PassageComponent,
    EditPassageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
