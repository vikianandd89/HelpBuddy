import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, flatMap, switchMap, mergeMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private CLOUDANT_USERNAME = "cd8288a2-1c6f-4f72-b856-6870fb292481-bluemix"
  private CLOUDANT_PASSWORD = "6512026bf2967b862f943083ff088077ad4f3f40c05a82e9ddbc713839d02264"
  private CLOUDANT_URL = "https://cd8288a2-1c6f-4f72-b856-6870fb292481-bluemix.cloudantnosqldb.appdomain.cloud";

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

  getDetails(query): Observable<any> {
    return this.http.post(this.url, query, this.httpOptions)
      .pipe(
        map((responses: any) => {
          this.notifications = responses.docs
          return responses.docs;
        }),
        (
          flatMap((responses: any[]) => this.service.getUser(responses[0].requester)
            .pipe(
              map(response =>
                this.notifications.filter(notification => notification.requester === response._id).map(notification => {
                  notification.user = response.fullName;
                  return notification;
                })
              )))));
  }

  getDetailsCount(query): Observable<any> {
    return this.http.post(this.url, query, this.httpOptions);
  }

  donate(db: string, doc: any): Observable<any> {
    const url = `${this.CLOUDANT_URL}/${db}`;

    return this.http.post<{}>(url, doc, this.httpOptions)
  }
}
