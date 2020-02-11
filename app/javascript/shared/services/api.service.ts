import { Injectable }                 from '@angular/core';
import { HttpClient, HttpParams }     from '@angular/common/http';

import { Observable }                 from 'rxjs';
import { map }                        from 'rxjs/operators';

import * as _ from "lodash";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  get(url: string, params?: HttpParams, options?: any): Observable<any> {
    options = options || {};
    options.observe = 'response';
    options.params = params;
    return this.http.get(url, options);
  }

  delete(url: string, params?: HttpParams, options?: any): Observable<any> {
    options = options || {};
    options.observe = 'response';
    options.params = params;
    return this.http.delete(url, options);
  }

  post(url: string, body: any|null, options?: any): Observable<any> {
    options = options || {};
    options.observe = 'response';
    return this.http.post(url, body, options);
  }

  put(url: string, body: any|null, options?: any): Observable<any> {
    options = options || {};
    options.observe = 'response';
    return this.http.put(url, body, options);
  }

  patch(url: string, body?: any, options?: any): Observable<any> {
    options = options || {};
    options.observe = 'response';
    return this.http.patch(url, body, options);
  }

  parsePaginationLink(link?: string): any {
    if (link) {
      const linkRe = /<([^>]+)>; rel="([^"]+)"/g;
      const pageRe = /(?:\?|&)page=(\d)+/;
      const urls = {};
      let m;
      while ((m = linkRe.exec(link)) !== null) {
        urls[m[2]] = m[1];
      }
      return urls;
    } else {
      return {};
    }
  }

  elections = {
    index: (): Observable<any> => {
      return this.get('/api/elections');
    },
    create: (data: any): Observable<any> => {
      return this.post('/api/elections', data);
    },
    get: (id: string): Observable<any> => {
      return this.get(`/api/elections/${id}`);
    },
    update: (id: string, data: any): Observable<any> => {
      return this.patch(`/api/elections/${id}`, data);
    }
  };

  measures = {
    index: (params: HttpParams): Observable<any> => {
      return this.get('/api/measures', params);
    },
    create: (data: any): Observable<any> => {
      return this.post('/api/measures', data);
    },
    get: (id: string): Observable<any> => {
      return this.get(`/api/measures/${id}`);
    },
    update: (id: string, data: any): Observable<any> => {
      return this.patch(`/api/measures/${id}`, data);
    },
    up: (id: string):  Observable<any> => {
      return this.patch(`/api/measures/${id}/up`);
    },
    down: (id: string):  Observable<any> => {
      return this.patch(`/api/measures/${id}/down`);
    }
  };

  orgs = {
    index: (params: HttpParams): Observable<any> => {
      return this.get('/api/orgs', params);
    },
    create: (data: any): Observable<any> => {
      return this.post('/api/orgs', data);
    },
    get: (id: string): Observable<any> => {
      return this.get(`/api/orgs/${id}`);
    },
    update: (id: string, data: any): Observable<any> => {
      return this.patch(`/api/orgs/${id}`, data);
    }
  };

  picks = {
    index: (params: HttpParams): Observable<any> => {
      return this.get('/api/picks', params);
    },
    create: (data: any): Observable<any> => {
      return this.post('/api/picks', data);
    },
    destroy: (id: string): Observable<any> => {
      return this.delete(`/api/picks/${id}`);
    }
  };
}
