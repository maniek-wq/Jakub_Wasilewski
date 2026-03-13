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

    // #region agent log
    fetch('http://127.0.0.1:7815/ingest/ae758e0f-6de2-497f-b8ce-999bcee03851',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'01516a'},body:JSON.stringify({sessionId:'01516a',runId:'loader-debug-r2',hypothesisId:'H2-app-timing',location:'app.component.ts:constructor',message:'AppComponent calling loading.start',data:{now:Date.now()},timestamp:Date.now()})}).catch(()=>{});
    // #endregion agent log
    this.loading.start('router');
    setTimeout(() => {
      // #region agent log
      fetch('http://127.0.0.1:7815/ingest/ae758e0f-6de2-497f-b8ce-999bcee03851',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'01516a'},body:JSON.stringify({sessionId:'01516a',runId:'loader-debug-r2',hypothesisId:'H2-app-timing',location:'app.component.ts:setTimeout',message:'AppComponent calling loading.stop after 1500ms',data:{now:Date.now()},timestamp:Date.now()})}).catch(()=>{});
      // #endregion agent log
      this.loading.stop('router');
    }, 1500);
  }
}
