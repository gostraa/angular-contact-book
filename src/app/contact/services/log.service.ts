import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LogService {
  private apiUrl = "http://localhost:3000/api/contacts/logs";

  constructor(private http: HttpClient) {}

  logErrorToConsole(message: string, error: any) {
    console.error(message, error);
  }

  logErrorToServer(error: any): Observable<any> {
    return this.http.post(this.apiUrl, { error });
  }
}
