import { Component, input, output, signal } from '@angular/core';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';
import { SearchButtonComponent } from '../../atoms/search-button/search-button.component';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
    standalone: true,
    imports: [InputFieldComponent, SearchButtonComponent],
    host: {
        'class': 'd-block w-100'
    }
})
export class SearchBarComponent {
    placeholder = input<string>('search_bar_placeholder');
    value = input<string>('');
    ariaLabel = input<string>('Search Bar');

    search = output<string>();

    currentSearchValue = signal<string>('');

    onValueChange(value: string) {
        this.currentSearchValue.set(value);
    }

    onSearch() {
        this.search.emit(this.currentSearchValue());
    }
}
