import { Component } from "@angular/core";

@Component({
  selector: "app-empty-route",
  imports: [],
  templateUrl: "./empty-route.component.html",
  styleUrl: "./empty-route.component.scss",
})
export class EmptyRouteComponent {
  title = "Oops! Page Not Found";
}
