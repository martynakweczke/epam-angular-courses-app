import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  transform(duration: number | null | undefined) {
    if (duration === null || duration === undefined) {
      return "00:00 hours";
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    const hoursLabel = hours === 1 ? "hour" : "hours";

    return `${formattedHours}:${formattedMinutes} ${hoursLabel}`;
  }
}
