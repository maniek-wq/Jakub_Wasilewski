import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingService } from './core/loading/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'portfolio';

  constructor(private translate: TranslateService, private loading: LoadingService) {
    const saved = (localStorage.getItem('lang') as 'pl' | 'en' | null) ?? 'pl';
    this.translate.setDefaultLang('pl');
    this.translate.use(saved);

    this.loading.start('router');
    setTimeout(() => this.loading.stop('router'), 1500);
  }
}
