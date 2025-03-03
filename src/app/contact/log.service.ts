import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LogService {
  private apiUrl = `http://localhost:4200/contacts`; // Путь для отправки логов

  constructor(private http: HttpClient) {}

  logError(error: any) {
    return this.http.post(this.apiUrl, { error });
  }
}
