import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "phoneFormat",
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    let phone = value.replace(/\D/g, "");

    if (phone.startsWith("0")) {
      phone = phone.slice(1);
    }

    if (!phone.startsWith("380")) {
      phone = "380" + phone;
    }

    return phone.length >= 12
      ? `+${phone.substring(0, 3)} (${phone.substring(3, 5)}) ${phone.substring(5, 8)}-${phone.substring(8, 10)}-${phone.substring(10, 12)}`
      : value;
  }
}
