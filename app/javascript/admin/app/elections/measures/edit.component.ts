import { HttpParams, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import clone from 'lodash/clone';
import find from 'lodash/find';
import map from 'lodash/map';
import merge from 'lodash/merge';

import { ApiService } from '../../../../shared/services';

@Component({
  templateUrl: './edit.component.html',
})
export class MeasuresEditComponent {
  private measure: any = null;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.api.measures.get(params.get('measure_id')))
      )
      .subscribe((response: HttpResponse<any>) => {
        this.measure = response.body;
      });
  }
}
