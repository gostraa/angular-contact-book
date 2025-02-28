import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { addContact } from "../../contact/actions/contact.actions";
import { v4 as uuidv4 } from "uuid";
import { Router } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
@Component({
  selector: "app-contact-form",
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  templateUrl: "./contact-form.component.html",
  styleUrl: "./contact-form.component.scss",
})
export class ContactFormComponent {
  contactForm: FormGroup;
  constructor(
    private store: Store,
    private router: Router
  ) {
    this.contactForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl(""),
      phone: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.store.dispatch(
        addContact({
          contact: {
            id: uuidv4(),
            ...this.contactForm.value,
          },
        })
      );

      this.contactForm.reset();
      this.router.navigate(["/contacts"]);
    } else {
      console.log(this.contactForm.value);
      console.log("Invalid contact data");
    }
  }

  goBack() {
    this.router.navigate(["/contacts"]);
  }
}
