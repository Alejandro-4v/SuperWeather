import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-search-button',
    templateUrl: './search-button.component.html',
    styleUrls: ['./search-button.component.scss'],
    standalone: true
})
export class SearchButtonComponent {
    label = input<string>('Search');
    ariaLabel = input<string>('');

    btnClick = output<void>();

    onClick() {
        this.btnClick.emit();
    }
}
