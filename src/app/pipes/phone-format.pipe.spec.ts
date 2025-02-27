import { PhoneFormatPipe } from "./phone-format.pipe";

describe("PhoneFormatPipe", () => {
  let pipe: PhoneFormatPipe;

  beforeEach(() => {
    pipe = new PhoneFormatPipe();
  });

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should format phone number correctly", () => {
    const result = pipe.transform("380123456789");
    expect(result).toBe("+380 (12) 345-67-89");
  });

  it("should return the same number if it is already in the correct format", () => {
    const result = pipe.transform("+380 (12) 345-67-89");
    expect(result).toBe("+380 (12) 345-67-89");
  });

  it("should return an empty string for an empty input", () => {
    const result = pipe.transform("");
    expect(result).toBe("");
  });
});
