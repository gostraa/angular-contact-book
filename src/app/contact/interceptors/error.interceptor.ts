import { inject } from "@angular/core";
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

export const ErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {
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

      snackBar.open(errorMessage, "Close", {
        duration: 5000,
        panelClass: "snackbar-error",
      });

      return throwError(() => error);
    })
  );
};
