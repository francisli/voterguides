import { Component } from '@angular/core';
import { IndexComponent } from '../../../shared/components';

@Component({
  templateUrl: './index.component.html',
})
export class ElectionsIndexComponent extends IndexComponent {
  ngOnInit() {
    this.type = 'elections';
    super.ngOnInit();
  }
}
