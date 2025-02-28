import { Component } from "@angular/core";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";
import { ContactListComponent } from "./components/contact-list/contact-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ContactEditComponent } from "./components/contact-edit/contact-edit.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "contacts-app";
}
