import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type LoadingScope = 'router' | 'http';

interface LoadingState {
  isLoading: boolean;
  startedAt: number | null;
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private pendingByScope = new Map<LoadingScope, number>([
    ['router', 0],
    ['http', 0],
  ]);

  private startedAt: number | null = null;
  private rafId: number | null = null;

  private readonly stateSubject = new BehaviorSubject<LoadingState>({
    isLoading: false,
    startedAt: null,
    duration: 0,
  });

  readonly loadingState$ = this.stateSubject.asObservable();

  start(scope: LoadingScope): void {
    const current = this.pendingByScope.get(scope) ?? 0;
    this.pendingByScope.set(scope, current + 1);

    const totalPending = this.getTotalPending();
    if (totalPending === 1) {
      this.startedAt = performance.now();
      this.startTicker();
    }

    this.emitState(true);
  }

  stop(scope: LoadingScope): void {
    const current = this.pendingByScope.get(scope) ?? 0;
    const next = Math.max(current - 1, 0);
    this.pendingByScope.set(scope, next);

    const totalPending = this.getTotalPending();
    if (totalPending === 0) {
      this.emitState(false);
      this.startedAt = null;
      this.stopTicker();
    } else {
      this.emitState(true);
    }
  }

  private getTotalPending(): number {
    let total = 0;
    for (const value of this.pendingByScope.values()) {
      total += value;
    }
    return total;
  }

  private emitState(isLoading: boolean): void {
    const now = performance.now();
    const startedAt = this.startedAt;
    const duration = startedAt != null ? now - startedAt : 0;

    // #region agent log
    fetch('http://127.0.0.1:7815/ingest/ae758e0f-6de2-497f-b8ce-999bcee03851', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': '01516a',
      },
      body: JSON.stringify({
        sessionId: '01516a',
        runId: 'loader-debug-r2',
        hypothesisId: 'H1-duration-emission',
        location: 'loading.service.ts:emitState',
        message: 'Loading state emit',
        data: { isLoading, startedAt, duration, pendingTotal: this.getTotalPending() },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion agent log

    this.stateSubject.next({
      isLoading,
      startedAt,
      duration,
    });
  }

  private startTicker(): void {
    if (this.rafId != null) {
      return;
    }

    const tick = () => {
      if (this.getTotalPending() === 0) {
        this.rafId = null;
        return;
      }

      this.emitState(true);
      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  private stopTicker(): void {
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

