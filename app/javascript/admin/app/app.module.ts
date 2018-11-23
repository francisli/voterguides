import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SortablejsModule } from 'angular-sortablejs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { ElectionsModule } from './elections/elections.module'
import { OrgsModule } from './orgs/orgs.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ElectionsModule,
    HttpClientModule,
    OrgsModule,
    SharedModule,
    SortablejsModule.forRoot({animation: 200})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
