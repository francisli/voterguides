import { HttpParams, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import clone from 'lodash/clone';

import { IndexComponent } from '../../../shared/components';
import { ApiService, NavigationService } from '../../../shared/services';

@Component({
  templateUrl: './edit.component.html',
})
export class ElectionsEditComponent extends IndexComponent {
  private election: any = null;

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.api.elections.get(params.get('election_id')))
      )
      .subscribe((response: HttpResponse<any>) => {
        this.election = response.body;
        this.type = 'measures';
        this.params = new HttpParams().set('election_id', this.election.data.id);
        super.ngOnInit();
      });
  }

  moveMeasure(measure: any, index: number, dir: number) {
    let records = clone(this.records);
    records.splice(index, 1);
    records.splice(index + dir, 0, measure);
    this.records = records;
  }

  onMeasureUp(measure: any) {
    let index = this.records.indexOf(measure);
    if (index > 0) {
      this.moveMeasure(measure, index, -1);
      this.api.measures.up(measure.id).subscribe();
    }
  }

  onMeasureDown(measure: any) {
    let index = this.records.indexOf(measure);
    if (index >= 0 && index < (this.records.length - 1)) {
      this.moveMeasure(measure, index, 1);
      this.api.measures.down(measure.id).subscribe();
    }
  }
}
