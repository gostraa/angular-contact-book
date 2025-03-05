import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LogService {
  http = inject(HttpClient);

  private apiUrl = "http://localhost:3000/api/contacts/logs";

  logErrorToConsole(message: string, error: any) {
    console.error(message, error);
  }

  logErrorToServer(error: any): Observable<any> {
    return this.http.post(this.apiUrl, { error });
  }
}
