import { Component, Input } from '@angular/core';

@Component({
  selector: 'vg-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() color = '#000';
}
