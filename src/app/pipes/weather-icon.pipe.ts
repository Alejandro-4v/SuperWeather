import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@environments/environment';

@Pipe({
    name: 'weatherIcon'
})
export class WeatherIconPipe implements PipeTransform {

    transform(value: string, size: '4x' | '2x' = '4x'): string {
        const url = environment.iconApiUrl;

        return `${url}/${size}/${value}.png`;
    }
}