import { Component } from "@angular/core";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";
import { ContactListComponent } from "./components/contact-list/contact-list.component";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-root",
  imports: [ContactFormComponent, ContactListComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "contacts-app";
}
