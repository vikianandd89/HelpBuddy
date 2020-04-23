import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private CLOUDANT_USERNAME = "cd8288a2-1c6f-4f72-b856-6870fb292481-bluemix"
  private CLOUDANT_PASSWORD = "6512026bf2967b862f943083ff088077ad4f3f40c05a82e9ddbc713839d02264"
  private CLOUDANT_URL = "https://cd8288a2-1c6f-4f72-b856-6870fb292481-bluemix.cloudantnosqldb.appdomain.cloud";

  private BASIC_AUTH = 'Basic ' + btoa(this.CLOUDANT_USERNAME + ':' + this.CLOUDANT_PASSWORD);
  private DATABASE = "/helpbuddy/_design/user/_search/login?";

  private _loggedInUserId: string;

  get loggedInUserId(): string {
    return this._loggedInUserId
  }

  set loggedInUserId(value: string) {
    this._loggedInUserId = value;
  }

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': this.BASIC_AUTH
    }),
    withCredentials: true,
  };

  loginUser(email: string, password: string): Observable<any> {
    const searchString = "q=email:" + email + " AND password:" + password;
    const url = this.CLOUDANT_URL + this.DATABASE + searchString;

    return this.http.get(url, this.httpOptions).pipe(map((response: any) => {
      return response.total_rows > 0 ? response.rows[0] : [];
    }));
  }

  getDoc(db: string, docId: string): Observable<any> {
    const url = `${this.CLOUDANT_URL}/${db}/${docId}`;
    return this.http.get(url, this.httpOptions).pipe(map(response => {
      return response;
    }));
  }

  createDoc(db: string, doc: any): Observable<any> {
    const url = `${this.CLOUDANT_URL}/${db}`;
    return this.http.post<{}>(url, doc, this.httpOptions)
  }

  updateDoc(db: string, docId: string, doc: any): Observable<any> {
    const url = `${this.CLOUDANT_URL}/${db}/${docId}`;
    return this.http.put<{}>(url, doc, this.httpOptions)
  }

  deleteDoc(db: string, docId: string): Observable<any> {
    const url = `${this.CLOUDANT_URL}/${db}/${docId}`;
    return this.http.delete<{}>(url, this.httpOptions)
  }
}
