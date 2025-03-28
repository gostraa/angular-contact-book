import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contact } from "../contact.model";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  http = inject(HttpClient);
  private apiUrl = "http://localhost:3000/api/contacts/";

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }
  contacts = toSignal<Contact[], Contact[]>(this.getContacts(), {
    initialValue: [] as Contact[],
  });

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
