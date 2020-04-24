import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': this.BASIC_AUTH
    }),
    withCredentials: true,
  };

  getNotifications(): Observable<any> {
    const query = {"selector":{"type":"request"},"execution_stats":true,"limit":21,"skip":0}
    
    return this.http.post(this.url, query, this.httpOptions);
  }

  
  getResponse(): Observable<any> {
    const query = {"selector":{"type":"response"},"execution_stats":true,"limit":21,"skip":0}
    
    return this.http.post(this.url, query, this.httpOptions);
  }

  donate(db: string, doc: any): Observable<any> {
    const url = `${this.CLOUDANT_URL}/${db}`;

    return this.http.post<{}>(url, doc, this.httpOptions)
  }
}
