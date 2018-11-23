import { HttpParams, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';

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
}
