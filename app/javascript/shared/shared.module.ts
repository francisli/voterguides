import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiService, NavigationService } from './services';
import { SpinnerComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    SpinnerComponent
  ],
  exports: [
    SpinnerComponent
  ],
  providers: [ApiService, NavigationService]
})
export class SharedModule {}
