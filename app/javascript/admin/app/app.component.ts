import { Component } from '@angular/core';
import { NavigationService } from '../../shared/services';

@Component({
  selector: 'vg-admin',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private navigation: NavigationService) { }
}
