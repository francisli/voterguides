import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NavigationService } from '../../../shared/services';

@Component({
  templateUrl: './new.component.html',
})
export class OrgsNewComponent {
  constructor(private navigation: NavigationService) { }

  onCreate() {
    this.navigation.backTo('/orgs');
  }
}
