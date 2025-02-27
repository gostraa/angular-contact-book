import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-contact-form",
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./contact-form.component.html",
  styleUrl: "./contact-form.component.scss",
})
export class ContactFormComponent {
  @Output() contactForm: FormGroup;
  constructor() {
    this.contactForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl(""),
      phone: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log("Contact added:", this.contactForm.value);
    } else {
      console.log(this.contactForm.value);
      console.log("Invalid contact data");
    }
  }
}
