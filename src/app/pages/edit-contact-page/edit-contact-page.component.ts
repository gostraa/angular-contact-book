import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ContactService } from "../../contact/services/contact.service";
import { Contact } from "../../contact/contact.model";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

import { Store } from "@ngrx/store";
import { updateContact } from "../../contact/actions/contact.actions";
import { ContactState } from "../../contact/reducers/contact.reducer";

@Component({
  selector: "app-contact-edit",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: "./edit-contact-page.component.html",
  styleUrl: "./edit-contact-page.component.scss",
})
export class ContactEditComponent implements OnInit {
  private store = inject(Store<ContactState>);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private contactService: ContactService = inject(ContactService);
  private contactId: string | null = null;
  private contact!: Contact;
  editForm!: FormGroup;

  ngOnInit(): void {
    this.editForm = new FormGroup({
      firstName: new FormControl<string>("", [Validators.required]),
      lastName: new FormControl<string>(""),
      phone: new FormControl<string>("", [Validators.required]),
      email: new FormControl<string>("", [
        Validators.required,
        Validators.email,
      ]),
    });
    this.contactId = this.route.snapshot.paramMap.get("id");
    if (this.contactId) this.loadContact();
  }

  loadContact() {
    if (this.contactId) {
      this.contactService
        .getContactById(this.contactId)
        .subscribe((contact) => {
          this.contact = contact;
          this.editForm.setValue({
            firstName: this.contact.firstName,
            lastName: this.contact.lastName || "",
            phone: this.contact.phone,
            email: this.contact.email,
          });
        });
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.store.dispatch(
        updateContact({
          contact: { id: this.contact.id, ...this.editForm.value },
        })
      );
      this.router.navigate(["/contacts"]);
    }
  }
}
