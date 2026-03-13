import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter } from 'rxjs';
import { LoadingService } from './loading.service';

export function provideRouterLoading(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: 'ROUTER_LOADING_INIT',
      deps: [Router, LoadingService],
      useFactory: (router: Router, loading: LoadingService) => {
        router.events
          .pipe(
            filter(
              (event) =>
                event instanceof NavigationStart ||
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError,
            ),
          )
          .subscribe((event) => {
            // #region agent log
            fetch('http://127.0.0.1:7815/ingest/ae758e0f-6de2-497f-b8ce-999bcee03851',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'01516a'},body:JSON.stringify({sessionId:'01516a',runId:'loader-debug-r2',hypothesisId:'H2-router-events',location:'router-loading.provider.ts:subscribe',message:'Router event',data:{eventType:event.constructor.name,now:Date.now()},timestamp:Date.now()})}).catch(()=>{});
            // #endregion agent log
            if (event instanceof NavigationStart) {
              loading.start('router');
            } else {
              loading.stop('router');
            }
          });

        return true;
      },
    },
  ]);
}

