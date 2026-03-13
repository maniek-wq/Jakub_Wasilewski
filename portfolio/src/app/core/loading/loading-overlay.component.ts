import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { LoadingService } from './loading.service';

type LoadingPhase = 'hidden' | 'short' | 'medium' | 'long';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-overlay.component.html',
})
export class LoadingOverlayComponent {
  readonly state$ = this.loadingService.loadingState$.pipe(
    map((state) => {
      const phase = this.getPhase(state.duration, state.isLoading);
      const visible = state.isLoading && state.duration >= 200;
      const progress = this.getProgress(state.duration, phase);

      // #region agent log
      fetch('http://127.0.0.1:7815/ingest/ae758e0f-6de2-497f-b8ce-999bcee03851',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'01516a'},body:JSON.stringify({sessionId:'01516a',runId:'loader-debug-r2',hypothesisId:'H1-overlay-state',location:'loading-overlay.component.ts:state$',message:'Overlay received state',data:{isLoading:state.isLoading,duration:state.duration,startedAt:state.startedAt,visible,phase,progress},timestamp:Date.now()})}).catch(()=>{});
      // #endregion agent log

      return {
        ...state,
        phase,
        visible,
        progress,
      };
    }),
  );

  constructor(private readonly loadingService: LoadingService) {}

  private getPhase(durationMs: number, isLoading: boolean): LoadingPhase {
    if (!isLoading) {
      return 'hidden';
    }
    if (durationMs < 200) {
      return 'hidden';
    }
    if (durationMs < 1000) {
      return 'short';
    }
    if (durationMs < 3000) {
      return 'medium';
    }
    return 'long';
  }

  private getProgress(durationMs: number, phase: LoadingPhase): number {
    switch (phase) {
      case 'short':
        return Math.min(80, (durationMs / 1000) * 80);
      case 'medium':
        return 80 + Math.min(15, ((durationMs - 1000) / 2000) * 15);
      case 'long': {
        const oscillation = 2.5 * Math.sin(durationMs / 500);
        return 95 + oscillation;
      }
      default:
        return 0;
    }
  }
}

