import { Injectable, ViewChild } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

import { Observable, Subscription, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import assign from 'lodash/assign';
import clone from 'lodash/clone';
import map from 'lodash/map';
import remove from 'lodash/remove';

import { ApiService, NavigationService } from '../services';

//// although this is not a service, annotate as Injectable so the constructor
//// params types are preserved for later dependency injection in subclasses
@Injectable()
export class IndexComponent {
  protected type: string;
  protected indexPath: string = null;
  protected basePath: string = null;
  protected params: HttpParams = null;
  protected query: string = null;
  @ViewChild('search') searchInput;

  protected records: any[] = null;
  protected paginationLink: string = null;
  protected isLoading = true;

  protected apiSubscription: Subscription;
  protected routerSubscription: Subscription;

  constructor(protected api: ApiService, protected route: ActivatedRoute, protected navigation: NavigationService) { }

  ngOnInit() {
    this.refresh();
    if (!this.indexPath) {
      this.indexPath = map(this.route.snapshot.pathFromRoot, r => r.url.join('')).join('/');
    }
    if (!this.basePath) {
      this.basePath = `/${this.type}`;
    }
    this.routerSubscription = this.navigation.getRouter().events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.endsWith(this.indexPath)) {
          let prevUrl = this.navigation.getPreviousUrl();
          let match = prevUrl.match(`${this.basePath.replace('/', '\/')}\/([^\/]+)`);
          if (match) {
            let id = match[1];
            if (id == 'new') {
              this.refresh();
            } else if (id) {
              this.refreshRecord(id);
            }
          }
        }
      });
  }

  ngAfterViewInit() {
    if (this.searchInput) {
      this.searchInput.valueChanges
        .debounceTime(300)
        .distinctUntilChanged()
        .subscribe(value => {
          if (this.query != null) {
            this.refresh();
          }
        });
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  protected refresh() {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
    this.records = [];
    this.isLoading = true;
    let params = this.params;
    if (this.query != null) {
      if (params == null) {
        params = new HttpParams()
      }
      params = params.set('search', this.query)
    }
    this.apiSubscription = this.api[this.type].index(params).subscribe(response => this.handleResponse(response));
  }

  protected refreshRecord(id: string) {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
    this.apiSubscription = this.api[this.type].get(id)
      .pipe(catchError(response => {
        if (response.status == 404) {
          //// deleted, remove from list
          let records = clone(this.records);
          remove(records, function(r) { return r.id == id; });
          this.records = records;
        }
        return empty();
      }))
      .subscribe(response => {
        let found = false;
        for (let record of this.records) {
          if (record.id == id) {
            assign(record, response.body.data);
            found = true;
            break;
          }
        }
        if (!found) {
          this.refresh();
        }
      });
  }

  protected handleResponse(response: HttpResponse<any>) {
    this.isLoading = false;
    if (this.records == null) {
      this.records = response.body.data;
    } else {
      this.records = this.records.concat(response.body.data);
    }
    this.paginationLink = this.api.parsePaginationLink(response.headers.get('Link')).next;
  }

  protected trackById(record, index): string {
    return record.id;
  }
}
