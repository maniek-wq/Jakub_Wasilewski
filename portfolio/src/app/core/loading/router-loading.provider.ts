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

