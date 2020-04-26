import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private CLOUDANT_USERNAME = "cd8288a2-1c6f-4f72-b856-6870fb292481-bluemix"
  private CLOUDANT_PASSWORD = "6512026bf2967b862f943083ff088077ad4f3f40c05a82e9ddbc713839d02264"
  private CLOUDANT_URL = "https://cd8288a2-1c6f-4f72-b856-6870fb292481-bluemix.cloudantnosqldb.appdomain.cloud/helpbuddy/";

  private url = "https://cd8288a2-1c6f-4f72-b856-6870fb292481-bluemix.cloudant.com/helpbuddy/_find";

  private BASIC_AUTH = 'Basic ' + btoa(this.CLOUDANT_USERNAME + ':' + this.CLOUDANT_PASSWORD);

  get loggedInUserId(): string {
    return sessionStorage.getItem("loggedInUser");
  }

  set loggedInUserId(value: string) {
    sessionStorage.setItem("loggedInUser", value);
  }

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': this.BASIC_AUTH
    }),
    withCredentials: true,
  };

  login(email: string, password: string): Observable<any> {
    const query = { "selector": { "type": "User", "email": email, "password": password }, "execution_stats": true, "limit": 21, "skip": 0 }


    return this.http.post(this.url, query, this.httpOptions)
  }

  register(formObject: any): Observable<any> {
    const doc = this.constructRequest(formObject);
    return this.http.post<{}>(this.CLOUDANT_URL, doc, this.httpOptions)
  }

  getUser(userId: string): Observable<any> {
    const url = this.CLOUDANT_URL + userId;
    return this.http.get(url, this.httpOptions).pipe(map((response: any) => {
      return response;
    }));
  }

  updateUser(doc: any): Observable<any> {
    const url = `${this.CLOUDANT_URL}/${this.loggedInUserId}`;

    return this.http.put<{}>(url, doc, this.httpOptions);
  }

  private constructRequest(form): any {
    return {
      "_id": "user-" + new Date().getTime(),
      "fullName": form.fullName,
      "type": "User",
      "email": form.email,
      "password": form.password,
      "phone": form.phone,
      "address": {
        "line1": form.address.line1,
        "line2": form.address.line2,
        "city": form.address.city,
        "postcode": form.address.postcode
      }
    }
  }
}