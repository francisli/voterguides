import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '../../../shared/services/api.service';

import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'vg-orgs-form',
  templateUrl: './form.component.html'
})
export class OrgsFormComponent {
  @Input() id: string = null;
  @Input() data = {
    name: '',
    metadata: {
      url: ''
    }
  };
  @Output() onCreate = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();

  protected loading = false;
  protected updated = false;

  constructor(protected api: ApiService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    this.updated = false;
    if (this.id) {
      this.api.orgs.update(this.id, this.data)
        .pipe(catchError(response => this.onError(response)))
        .subscribe(response => {
          this.loading = false;
          this.updated = true;
          this.onUpdate.emit(response.body);
        });
    } else {
      this.api.orgs.create(this.data)
        .pipe(catchError(response => this.onError(response)))
        .subscribe(response => {
          this.loading = false;
          this.onCreate.emit(response.body);
        });
    }
  }

  onError(response): Observable<any> {
    this.loading = false;
    this.updated = false;
    return empty();
  }
}
