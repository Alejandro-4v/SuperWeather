import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  standalone: true
})
export class InputFieldComponent {
  placeholder = input<string>('');
  value = input<string>('');
  ariaLabel = input<string>('');

  valueChange = output<string>();

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value);
  }
}
