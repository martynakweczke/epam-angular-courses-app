import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe implements PipeTransform {
  transform(date: Date | undefined) {
    if (!date) {
      return "";
    }
    
    return date.toLocaleDateString('pl-PL', {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
  }
}
