import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '../../../../shared/services/api.service';

import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import clone from 'lodash/clone';

@Component({
  selector: 'vg-measures-form',
  templateUrl: './form.component.html'
})
export class MeasuresFormComponent {
  @Input() electionId: string = null;
  @Input() id: string = null;
  @Input() data = {
    title: "",
    metadata: {
      type: "election",
    },
    choices_attributes: []
  };
  @Output() onCreate = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();

  protected choice = {
    title: "",
    metadata: {}
  };

  protected loading = false;
  protected updated = false;

  constructor(protected api: ApiService) { }

  ngOnInit() {
  }

  onAddChoice() {
    let choices = clone(this.data.choices_attributes);
    choices.push(clone(this.choice));
    this.data.choices_attributes = choices;
    this.choice.title = "";
  }

  onRemoveChoice(choice: any) {
    if (choice['_destroy']) {
      delete choice['_destroy'];
    } else {
      choice['_destroy'] = '1';
    }
    return false;
  }

  onSubmit() {
    this.loading = true;
    this.updated = false;
    if (this.id) {
      let i = 1;
      for (let choice of this.data.choices_attributes) {
        choice.position = i;
        i += 1;
      }
      this.api.measures.update(this.id, this.data)
        .pipe(catchError(response => this.onError(response)))
        .subscribe(response => {
          this.loading = false;
          this.updated = true;
          this.onUpdate.emit(response.body);
        });
    } else {
      let data = clone(this.data);
      data.election_id = this.electionId;
      this.api.measures.create(data)
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
