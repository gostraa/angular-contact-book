import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, tap } from "rxjs";
import { Contact } from "../contact.model";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  private apiUrl = "http://localhost:3000/api/contacts/";

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}${id}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}${contact.id}`, contact);
  }

  deleteContact(id: string): Observable<{ id: string }> {
    return this.http.delete<{ id: string }>(`${this.apiUrl}${id}`);
  }
}
