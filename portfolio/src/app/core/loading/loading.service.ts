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
      this.emitState(true);
    } else {
      this.emitState(true);
    }
  }

  stop(scope: LoadingScope): void {
    const current = this.pendingByScope.get(scope) ?? 0;
    const next = Math.max(current - 1, 0);
    this.pendingByScope.set(scope, next);

    const totalPending = this.getTotalPending();
    if (totalPending === 0) {
      this.emitState(false);
      this.startedAt = null;
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

    this.stateSubject.next({
      isLoading,
      startedAt,
      duration,
    });
  }
}

