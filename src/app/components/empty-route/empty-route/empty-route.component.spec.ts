import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EmptyRouteComponent } from "./empty-route.component";

describe("EmptyRouteComponent", () => {
  let component: EmptyRouteComponent;
  let fixture: ComponentFixture<EmptyRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyRouteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Oops! Page Not Found' title`, () => {
    const fixture = TestBed.createComponent(EmptyRouteComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("Oops! Page Not Found");
  });

  it("should render title", () => {
    const fixture = TestBed.createComponent(EmptyRouteComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("h1")?.textContent).toContain(
      "Oops! Page Not Found"
    );
  });
});
