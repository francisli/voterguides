import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '../../../../shared/services/api.service';

import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import clone from 'lodash/clone';

@Component({
  selector: 'vg-picks-form',
  templateUrl: './form.component.html'
})
export class PicksFormComponent {
  @Input() org: any = null;
  @Input() measure: any = null;
  @Input() data = {
    choice_id: null,
    metadata: {
      recommendation: true
    }
  };
  @Output() onCreate = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

  protected loading = false;
  protected updated = false;

  constructor(protected api: ApiService) { }

  ngOnInit() {
  }

  onCancelInternal() {
    this.onCancel.emit(this);
  }

  onSubmit() {
    this.loading = true;
    this.updated = false;
    let data = clone(this.data);
    data.measure_id = this.measure.id;
    data.org_id = this.org.id;
    this.api.picks.create(data)
      .pipe(catchError(response => this.onError(response)))
      .subscribe(response => {
        this.loading = false;
        this.onCreate.emit(response.body);
      });
  }

  onError(response): Observable<any> {
    this.loading = false;
    this.updated = false;
    return empty();
  }
}
