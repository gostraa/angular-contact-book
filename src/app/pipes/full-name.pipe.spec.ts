import { FullNamePipe } from "./full-name.pipe";

describe("FullNamePipe", () => {
  let pipe: FullNamePipe;

  beforeEach(() => {
    pipe = new FullNamePipe();
  });

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should concatenate first name and last name", () => {
    const result = pipe.transform({ firstName: "John", lastName: "Doe" });
    expect(result).toBe("John Doe");
  });

  it("should handle missing last name", () => {
    const result = pipe.transform({ firstName: "John", lastName: "" });
    expect(result).toBe("John");
  });
});
