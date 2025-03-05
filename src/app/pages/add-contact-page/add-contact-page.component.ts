import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { addContact } from "../../contact/actions/contact.actions";
import { Router } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { UuidService } from "../../contact/services/uuid.service";
import { ContactState } from "../../contact/reducers/contact.reducer";
import { Contact } from "../../contact/contact.model";
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
  templateUrl: "./add-contact-page.component.html",
  styleUrl: "./add-contact-page.component.scss",
})
export class ContactFormComponent {
  private store = inject(Store<ContactState>);
  private router: Router = inject(Router);
  private uuidService: UuidService = inject(UuidService);
  contactForm: FormGroup;

  constructor() {
    this.contactForm = new FormGroup({
      firstName: new FormControl<string>("", [Validators.required]),
      lastName: new FormControl<string>(""),
      phone: new FormControl<string>("", [Validators.required]),
      email: new FormControl<string>("", [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.store.dispatch(
        addContact({
          contact: {
            id: this.uuidService.v4(),
            ...this.contactForm.value,
          },
        })
      );

      this.contactForm.reset();
      this.router.navigate(["/contacts"]);
    }
  }

  goBack() {
    this.router.navigate(["/contacts"]);
  }
}
