import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Contact } from "../../models/contact.model";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  private apiUrl = `https://contacts-api-delta.vercel.app/api/contacts`;

  constructor(private http: HttpClient) {}
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl).pipe(
      tap({
        next: (data) => {
          console.log("response", data);
        },
        error: (error) => {
          console.error("error getting contacts:", error);
        },
      }),
      catchError((error) => {
        console.error("request error", error);
        if (error.status === 0) {
          console.error("CORS error");
        }
        return throwError(() => error);
      })
    );
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${contact.id}`, contact);
  }
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
