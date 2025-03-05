import { inject, Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class ErrorInterceptor implements HttpInterceptor {
  snackBar = inject(MatSnackBar);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          if (error.status === 500) {
            errorMessage = "Internal server error. Please try again later.";
          } else if (error.status === 404) {
            errorMessage = "Resource not found.";
          } else if (error.status === 0) {
            errorMessage = "No internet connection. Please check your network.";
          } else {
            errorMessage = `Server returned code ${error.status}: ${error.message}`;
          }
        }

        this.snackBar.open(errorMessage, "Close", {
          duration: 5000,
          panelClass: "snackbar-error",
        });

        return throwError(() => error);
      })
    );
  }
}
