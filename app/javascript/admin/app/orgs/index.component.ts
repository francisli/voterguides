import { Component } from '@angular/core';
import { IndexComponent } from '../../../shared/components';

@Component({
  templateUrl: './index.component.html',
})
export class OrgsIndexComponent extends IndexComponent {
  ngOnInit() {
    this.type = 'orgs';
    super.ngOnInit();
  }
}
