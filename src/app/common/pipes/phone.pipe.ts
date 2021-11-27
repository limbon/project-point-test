import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
  transform(value: any, country?: string) {
    if (value) {
      return parsePhoneNumber(
        value.toString(),
        country as CountryCode
      ).formatInternational();
    }

    return value;
  }
}
