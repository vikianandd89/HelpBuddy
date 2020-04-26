import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, flatMap, switchMap, mergeMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private CLOUDANT_USERNAME = "cd8288a2-1c6f-4f72-b856-6870fb292481-bluemix"
  private CLOUDANT_PASSWORD = "6512026bf2967b862f943083ff088077ad4f3f40c05a82e9ddbc713839d02264"
  private CLOUDANT_URL = "https://cd8288a2-1c6f-4f72-b856-6870fb292481-bluemix.cloudantnosqldb.appdomain.cloud/helpbuddy";

  private BASIC_AUTH = 'Basic ' + btoa(this.CLOUDANT_USERNAME + ':' + this.CLOUDANT_PASSWORD);
  private DATABASE = "/helpbuddy/_design/user/_search/login?";

  private url = "https://cd8288a2-1c6f-4f72-b856-6870fb292481-bluemix.cloudant.com/helpbuddy/_find";

  private _count = 0;

  constructor(private http: HttpClient, private service: UserService) { }

  private notifications: any;
  private responses: any;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': this.BASIC_AUTH
    }),
    withCredentials: true,
  };

  getNotifications(query): Observable<any> {
    return this.http.post(this.url, query, this.httpOptions)
      .pipe(
        map((responses: any) => {
          this.notifications = responses.docs
          return responses;
        }),
        (
          flatMap((responses: any) => {
            if (responses.docs.length > 0) {
              return forkJoin(responses.docs.map(r =>
                this.service.getUser(r.requester).pipe(map(response => {
                  const notification = this.notifications.find(n => n.requester === response._id)
                  notification.user = response.fullName;
                  notification.isDeleted = false;
                  return notification;
                }))
              ))
            } else {
              return of([]);
            }
          })));
  }

  getResponses(query): Observable<any> {
    return this.http.post(this.url, query, this.httpOptions)
      .pipe(
        map((responses: any) => {
          this.notifications = responses.docs
          return responses;
        }),
        (
          flatMap((responses: any) => {
            if (responses.docs.length > 0) {
              return forkJoin(responses.docs.map(r =>
                this.service.getUser(r.responder).pipe(map(response => {
                  const notification = this.notifications.find(n => n.responder === response._id)
                  notification.user = response.fullName;
                  notification.isDeleted = false;
                  return notification;
                }))
              ))
            } else {
              return of([]);
            }
          })));
  }

  getDetailsCount(query): Observable<any> {
    return this.http.post(this.url, query, this.httpOptions);
  }

  donate(doc: any): Observable<any> {
    return this.http.post<{}>(this.CLOUDANT_URL, doc, this.httpOptions)
  }

  closeRequest(doc: any): Observable<any> {
    const url = `${this.CLOUDANT_URL}/${doc._id}`;

    return this.http.put<{}>(url, doc, this.httpOptions);
  }
}