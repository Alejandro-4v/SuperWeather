import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    currentLang = signal('en-GB');
    translations = signal<Record<string, string>>({});

    constructor(private http: HttpClient) {
        this.initLanguage();
    }

    initLanguage() {
        const browserLang = navigator.language;
        let langToLoad = 'en-GB';

        if (browserLang.startsWith('es')) {
            langToLoad = 'es-ES';
        } else if (browserLang.startsWith('pt')) {
            langToLoad = 'pt-PT';
        } else if (browserLang.startsWith('en')) {
            langToLoad = 'en-GB';
        }

        this.loadTranslation(langToLoad);
    }

    async loadTranslation(lang: string) {
        try {
            const data = await firstValueFrom(this.http.get<Record<string, string>>(`assets/i18n/${lang}.json`));
            this.translations.set(data);
            this.currentLang.set(lang);
        } catch (error) {
            console.error(`Could not load translation for ${lang}`, error);
        }
    }

    translate(key: string): string {
        const trans = this.translations();
        return trans[key] || key;
    }
}
