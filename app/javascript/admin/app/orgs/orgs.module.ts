import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsModule } from 'angular-sortablejs';

import { SharedModule } from '../../../shared/shared.module';

import { OrgsRoutingModule } from './orgs-routing.module';
import { OrgsEditComponent, OrgsFormComponent, OrgsIndexComponent,
  OrgsNewComponent } from '.';
import { PicksFormComponent } from './picks';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    SortablejsModule,
    OrgsRoutingModule
  ],
  declarations: [
    OrgsEditComponent,
    OrgsFormComponent,
    OrgsIndexComponent,
    OrgsNewComponent,
    PicksFormComponent
  ]
})
export class OrgsModule {}
