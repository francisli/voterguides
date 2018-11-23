import { Component } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { ApiService } from '../../shared/services/api.service';

import filter from 'lodash/filter';

@Component({
  selector: 'vg-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private elections: any[] = null;
  private selectedElection: any = null;
  private measures: any[] = null;
  private orgs: any[] = null;
  private selectedOrgs = {};
  private picks = {};
  private rows: any[] = null;

  private showAll = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.elections.index().subscribe((response: HttpResponse<any>) => {
      this.elections = response.body.data;
      if (this.elections.length > 0) {
        this.selectedElection = this.elections[0];
        this.refresh();
      }
    });
  }

  trackById(record, index): string {
    return record.id;
  }

  onSelectElection(election: any) {
    this.selectedElection = election;
    this.refresh();
  }

  refresh() {
    this.orgs = null;
    this.selectedOrgs = {};
    this.rows = null;
    this.api.orgs.index(new HttpParams().set('election_id', this.selectedElection.id))
      .subscribe((response: HttpResponse<any>) => {
        this.orgs = response.body.data;
      });
    this.api.measures.index(new HttpParams().set('election_id', this.selectedElection.id))
      .subscribe((response: HttpResponse<any>) => {
        this.measures = response.body.data;
        this.filterRows();
      });
  }

  onToggleShowAll() {
    this.showAll = !this.showAll;
    this.filterRows();
  }

  filterRows() {
    let rows = []
    for (let measure of this.measures) {
      if (this.showAll || this.hasRecommendationFor(measure)) {
        switch (measure.attributes.metadata.type) {
        case 'election':
          let first = true;
          for (let choice of measure.attributes.choices_attributes) {
            if (this.showAll || this.hasRecommendationFor(measure, choice)) {
              if (first) {
                first = false;
                rows.push([measure, choice]);
              } else {
                rows.push([null, choice]);
              }
            }
          }
          break;
        case 'measure':
          rows.push([measure, null])
          break;
        }
      }
    }
    this.rows = rows;
  }

  hasRecommendationFor(measure: any, choice?: any): boolean {
    switch (measure.attributes.metadata.type) {
    case 'election':
      if (choice) {
        for (let id of Object.keys(this.picks)) {
          if (this.selectedOrgs[id] && this.picks[id].choices[choice.id]) {
            return true;
          }
        }
      } else {
        for (let choice of measure.attributes.choices_attributes) {
          for (let id of Object.keys(this.picks)) {
            if (this.selectedOrgs[id] && this.picks[id].choices[choice.id]) {
              return true;
            }
          }
        }
      }
      break;
    case 'measure':
      for (let id of Object.keys(this.picks)) {
        if (this.selectedOrgs[id] && this.picks[id].measures[measure.id]) {
          return true;
        }
      }
      break;
    }
    return false;
  }

  recommendation(measure, choice, picks) {
    let pick;
    if (picks) {
      if (choice) {
        pick = picks.choices[choice.id];
      } else {
        pick = picks.measures[measure.id];
      }
    }
    if (pick) {
      return pick.metadata.recommendation ? 'for' : 'against';
    }
    return '';
  }

  onSelectOrg(org: any) {
    this.selectedOrgs[org.id] = !this.selectedOrgs[org.id];
    if (this.selectedOrgs[org.id]) {
      if (!this.picks[org.id]) {
        this.api.picks.index(new HttpParams().set('election_id', this.selectedElection.id).set('org_id', org.id))
          .subscribe((response: HttpResponse<any>) => {
            let picks = {
              choices: {},
              measures: {}
            };
            for (let measure of response.body.data) {
              for (let pick of measure.attributes.picks_attributes) {
                if (pick.choice_id) {
                  picks.choices[pick.choice_id] = pick;
                } else {
                  picks.measures[measure.id] = pick;
                }
              }
            }
            this.picks[org.id] = picks;
            this.filterRows();
          });
      } else {
        this.filterRows();
      }
    } else {
      this.filterRows();
    }
  }

  selectedOrgsArray(): any[] {
    return filter(this.orgs, o => this.selectedOrgs[o.id]);
  }
}
