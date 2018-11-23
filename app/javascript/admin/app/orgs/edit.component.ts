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
export class OrgsEditComponent extends IndexComponent {
  private org: any = null;
  private elections: any[] = null;
  private selectedElection: any = null;

  private showPickForm = {};

  ngOnInit() {
    this.type = 'picks';
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.api.orgs.get(params.get('org_id'))),
        switchMap((response: HttpResponse<any>) => {
          this.org = response.body.data;
          return this.api.elections.index();
        })
      )
      .subscribe((response: HttpResponse<any>) => {
        this.elections = response.body.data;
        if (this.elections.length > 0) {
          this.selectedElection = this.elections[0];
        }
        this.params = new HttpParams()
          .set('election_id', this.selectedElection.id)
          .set('org_id', this.org.id);
        super.ngOnInit();
      });
  }

  onSelectElection(election: any) {
    this.selectedElection = election;
    this.params = new HttpParams()
      .set('election_id', this.selectedElection.id)
      .set('org_id', this.org.id);
    this.refresh();
  }

  choiceForPick(measure: any, pick: any) {
    for (let choice of measure.attributes.choices_attributes) {
      if (choice.id == pick.choice_id) {
        return choice;
      }
    }
    return null;
  }

  onCreatePick(measure: any, pick: any) {
    this.showPickForm[measure.id] = false;
    measure.attributes.picks_attributes.push(pick);
  }

  onRemovePick(measure: any, pick: any) {
    let index = measure.attributes.picks_attributes.indexOf(pick);
    measure.attributes.picks_attributes.splice(index, 1);
    this.api.picks.destroy(pick.id).subscribe();
    return false;
  }
}
