import { Component, output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline } from 'ionicons/icons';

@Component({
    selector: 'app-search-button',
    templateUrl: './search-button.component.html',
    standalone: true,
    imports: [IonIcon],
    host: {
        'class': 'd-flex align-items-center justify-content-center'
    }
})
export class SearchButtonComponent {
    btnClick = output<void>();

    constructor() {
        addIcons({ searchOutline });
    }

    onClick() {
        this.btnClick.emit();
    }
}
