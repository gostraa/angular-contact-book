import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError, tap } from "rxjs";
import { Contact } from "../contact.model";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  private snackBar = inject(MatSnackBar);
  private apiUrl = `http://localhost:3000/api/contacts/`;

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl).pipe(
      tap({
        error: (error) => this.handleError("Failed to load contacts", error),
      }),
      catchError((error) => this.processError(error))
    );
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: () => this.showSnackBar("Contact loaded successfully!", "Close"),
        error: (error) => this.handleError("Failed to load contact", error),
      }),
      catchError((error) => this.processError(error))
    );
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact).pipe(
      tap({
        next: () => this.showSnackBar("Contact added successfully!", "Close"),
        error: (error) => this.handleError("Failed to add contact", error),
      }),
      catchError((error) => this.processError(error))
    );
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${contact.id}`, contact).pipe(
      tap({
        next: () => this.showSnackBar("Contact updated successfully!", "Close"),
        error: (error) => this.handleError("Failed to update contact", error),
      }),
      catchError((error) => this.processError(error))
    );
  }

  deleteContact(id: number | string): Observable<{ id: number | string }> {
    return this.http
      .delete<{ id: number | string }>(`${this.apiUrl}/${id}`)
      .pipe(
        tap({
          error: (error) => this.handleError("Failed to delete contact", error),
        }),
        catchError((error) => this.processError(error))
      );
  }

  private showSnackBar(
    message: string,
    action: string,
    type: "success" | "error" = "success"
  ) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: type === "success" ? "snackbar-success" : "snackbar-error",
    });
  }

  private handleError(message: string, error: any) {
    console.error(message, error);
    this.showSnackBar(message, "Close", "error");
  }

  private processError(error: any) {
    return throwError(() => error);
  }
}
