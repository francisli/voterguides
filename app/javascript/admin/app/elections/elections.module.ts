import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsModule } from 'angular-sortablejs';

import { SharedModule } from '../../../shared/shared.module';

import { ElectionsRoutingModule } from './elections-routing.module';
import { ElectionsEditComponent, ElectionsIndexComponent, ElectionsNewComponent,
  ElectionsFormComponent } from '.';
import { MeasuresEditComponent, MeasuresFormComponent,
  MeasuresNewComponent } from './measures';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    SortablejsModule,
    ElectionsRoutingModule
  ],
  declarations: [
    ElectionsEditComponent,
    ElectionsFormComponent,
    ElectionsIndexComponent,
    ElectionsNewComponent,
    MeasuresEditComponent,
    MeasuresFormComponent,
    MeasuresNewComponent
  ]
})
export class ElectionsModule {}
