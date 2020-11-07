import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Session } from 'src/app/models/utils/session/session';
import { Constants } from 'src/app/models/utils/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ConnectionManagerService {

  constructor(
    private http: HttpClient,
  ) { }

  public async apiRequestGet(route: string) {
    var options;
    if (Session.getSessionItem('token')) {
      options = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + Session.getSessionItem('token')
        })
      };
    } else {
      options = {
        headers: null
      };
    }
    return new Promise((resolve) => {
      this.http.get(Constants.API_ROUTE.SERVER + route, options).subscribe(httpResponse => {
        if (httpResponse && httpResponse['token']) {
          Session.setSessionItem('token', httpResponse['token']);
        }
        resolve(httpResponse);
      });
    });
  }

  public async apiRequestPost(data: any, route: string) {
    var options;
    if (Session.getSessionItem('token')) {
      options = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + Session.getSessionItem('token')
        })
      };
    } else {
      options = {
        headers: null
      };
    }
    return new Promise((resolve) => {
      this.http.post(Constants.API_ROUTE.SERVER + route, data, options).subscribe(httpResponse => {
        if (httpResponse && httpResponse['token']) {
          Session.setSessionItem('token', httpResponse['token']);
        }
        resolve(httpResponse);
      });
    });
  }

  public async apiRequestPut(data: any, route: string) {
    var options;
    if (Session.getSessionItem('token')) {
      options = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + Session.getSessionItem('token')
        })
      };
    } else {
      options = {
        headers: null
      };
    }
    return new Promise((resolve, reject) => {
      this.http.put(Constants.API_ROUTE.SERVER + route, data, options).subscribe(httpResponse => {
        if (httpResponse && httpResponse['token']) {
          Session.setSessionItem('token', httpResponse['token']);
        }
        resolve(httpResponse);
      });
    });
  }

}
